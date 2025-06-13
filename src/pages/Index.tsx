
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2 } from "lucide-react";
import { DashboardSummary } from "../components/DashboardSummary";
import { PartnerCard } from "../components/PartnerCard";
import { PartnerForm } from "../components/PartnerForm";
import { HouseTable } from "../components/HouseTable";
import { MovementForm } from "../components/MovementForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Partner, BettingHouse, Movement } from "../types";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [partners, setPartners] = useLocalStorage<Partner[]>('arbitrage-partners', []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | undefined>();
  const [showMovementForm, setShowMovementForm] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState<string>('');
  const { toast } = useToast();

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.cpf.includes(searchTerm.replace(/\D/g, ''))
  );

  const handleSavePartner = (partnerData: Omit<Partner, 'id' | 'createdAt' | 'houses'>) => {
    if (editingPartner) {
      setPartners(prev => prev.map(p => 
        p.id === editingPartner.id 
          ? { ...p, ...partnerData }
          : p
      ));
    } else {
      const newPartner: Partner = {
        id: Date.now().toString(),
        ...partnerData,
        createdAt: new Date(),
        houses: []
      };
      setPartners(prev => [...prev, newPartner]);
    }
    setEditingPartner(undefined);
  };

  const handleDeletePartner = (partnerId: string) => {
    setPartners(prev => prev.filter(p => p.id !== partnerId));
    setSelectedPartner(null);
    toast({
      title: "Parceiro excluído",
      description: "Parceiro e todas as suas casas foram removidos.",
    });
  };

  const handleSaveMovement = (movementData: Omit<Movement, 'id'>) => {
    const newMovement: Movement = {
      id: Date.now().toString(),
      ...movementData
    };

    setPartners(prev => prev.map(partner => ({
      ...partner,
      houses: partner.houses.map(house => 
        house.id === movementData.houseId
          ? { ...house, movements: [...house.movements, newMovement] }
          : house
      )
    })));

    if (selectedPartner) {
      setSelectedPartner(prev => prev ? {
        ...prev,
        houses: prev.houses.map(house => 
          house.id === movementData.houseId
            ? { ...house, movements: [...house.movements, newMovement] }
            : house
        )
      } : null);
    }
  };

  const handleAddMovement = (houseId: string) => {
    setSelectedHouseId(houseId);
    setShowMovementForm(true);
  };

  const getSelectedHouseName = () => {
    if (!selectedPartner || !selectedHouseId) return '';
    const house = selectedPartner.houses.find(h => h.id === selectedHouseId);
    return house?.name || '';
  };

  if (selectedPartner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedPartner(null)}
                className="mb-2"
              >
                ← Voltar aos Parceiros
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedPartner.name}
              </h1>
              <p className="text-gray-600">CPF: {selectedPartner.cpf}</p>
            </div>
          </div>

          <HouseTable
            houses={selectedPartner.houses}
            onAddHouse={() => {/* TODO: Implementar formulário de casa */}}
            onEditHouse={() => {/* TODO: Implementar edição de casa */}}
            onDeleteHouse={() => {/* TODO: Implementar exclusão de casa */}}
            onAddMovement={handleAddMovement}
          />

          <MovementForm
            open={showMovementForm}
            onOpenChange={setShowMovementForm}
            houseId={selectedHouseId}
            houseName={getSelectedHouseName()}
            onSave={handleSaveMovement}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ArbitrageManager
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema inteligente para gestão de arbitragem esportiva. 
            Controle parceiros, casas de apostas e lucros de forma automática.
          </p>
        </div>

        <DashboardSummary partners={partners} />

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={() => setShowPartnerForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Parceiro
          </Button>
        </div>

        {filteredPartners.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <Building2 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? 'Nenhum parceiro encontrado' : 'Nenhum parceiro cadastrado'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Tente ajustar os termos da busca'
                    : 'Comece adicionando seu primeiro parceiro para gerenciar as arbitragens'
                  }
                </p>
                {!searchTerm && (
                  <Button 
                    onClick={() => setShowPartnerForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Cadastrar Primeiro Parceiro
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPartners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                onView={setSelectedPartner}
                onEdit={(partner) => {
                  setEditingPartner(partner);
                  setShowPartnerForm(true);
                }}
                onDelete={handleDeletePartner}
              />
            ))}
          </div>
        )}

        <PartnerForm
          open={showPartnerForm}
          onOpenChange={(open) => {
            setShowPartnerForm(open);
            if (!open) setEditingPartner(undefined);
          }}
          partner={editingPartner}
          onSave={handleSavePartner}
        />
      </div>
    </div>
  );
};

export default Index;
