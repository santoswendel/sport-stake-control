
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Partner } from "../types";
import { validateCPF } from "../lib/calculations";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface PartnerFormProps {
  onClose: () => void;
  partner?: Partner;
}

export function PartnerForm({ onClose, partner }: PartnerFormProps) {
  const [partners, setPartners] = useLocalStorage<Partner[]>('partners', []);
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    cpf: partner?.cpf || '',
    notes: partner?.notes || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro de validação",
        description: "Verifique os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const newPartner: Partner = {
      id: partner?.id || Date.now().toString(),
      name: formData.name.trim(),
      cpf: formData.cpf.replace(/\D/g, ''),
      notes: formData.notes.trim() || undefined,
      createdAt: partner?.createdAt || new Date(),
      houses: partner?.houses || []
    };

    if (partner) {
      setPartners(partners.map(p => p.id === partner.id ? newPartner : p));
    } else {
      setPartners([...partners, newPartner]);
    }
    
    toast({
      title: partner ? "Parceiro atualizado" : "Parceiro criado",
      description: "Dados salvos com sucesso!",
    });
    
    onClose();
  };

  const handleCPFChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const formattedValue = cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14);
    
    setFormData(prev => ({ ...prev, cpf: formattedValue }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        {partner ? 'Editar Parceiro' : 'Novo Parceiro'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Ex: João Silva Santos"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => handleCPFChange(e.target.value)}
            placeholder="000.000.000-00"
            className={errors.cpf ? 'border-red-500' : ''}
          />
          {errors.cpf && <p className="text-sm text-red-600">{errors.cpf}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Anotações internas sobre o parceiro..."
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {partner ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  );
}
