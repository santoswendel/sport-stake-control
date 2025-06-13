
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Building2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Partner } from "../types";
import { calculatePartnerProfit, formatCurrency, formatCPF } from "../lib/calculations";
import { PartnerForm } from "../components/PartnerForm";

export default function Parceiros() {
  const [partners] = useLocalStorage<Partner[]>('partners', []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.cpf.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Parceiros</h1>
          <p className="text-muted-foreground">Gerencie todos os seus parceiros de arbitragem</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Parceiro
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredPartners.length} de {partners.length} parceiros
        </div>
      </div>

      {/* Partners Grid */}
      {filteredPartners.length === 0 && searchTerm === "" ? (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum parceiro cadastrado</h3>
            <p className="text-muted-foreground mb-4">
              Comece cadastrando seu primeiro parceiro para usar o sistema
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Cadastrar Primeiro Parceiro
            </Button>
          </CardContent>
        </Card>
      ) : filteredPartners.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground">
              Tente buscar por outro nome ou CPF
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map((partner) => {
            const profit = calculatePartnerProfit(partner.houses);
            const housesCount = partner.houses.length;
            
            return (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={`/parceiros/${partner.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{formatCPF(partner.cpf)}</p>
                      </div>
                      <Badge variant={profit > 0 ? "default" : profit < 0 ? "destructive" : "secondary"}>
                        {formatCurrency(profit)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        {housesCount} {housesCount === 1 ? 'casa' : 'casas'}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        {profit > 27500 && (
                          <Badge variant="outline" className="text-xs">
                            Alerta Fiscal
                          </Badge>
                        )}
                      </div>
                    </div>
                    {partner.notes && (
                      <p className="text-xs text-muted-foreground mt-2 truncate">
                        {partner.notes}
                      </p>
                    )}
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      )}

      {/* Partner Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-md w-full">
            <PartnerForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
