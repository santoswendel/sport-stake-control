
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp, Users, Wallet, Building2, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Partner } from "../types";
import { calculatePartnerProfit, calculateHouseBalance, formatCurrency, calculateTaxAmount } from "../lib/calculations";

export default function Dashboard() {
  const [partners] = useLocalStorage<Partner[]>('partners', []);
  
  const totalPartners = partners.length;
  const totalProfit = partners.reduce((sum, partner) => sum + calculatePartnerProfit(partner.houses), 0);
  const totalBalance = partners.reduce((sum, partner) => 
    sum + partner.houses.reduce((houseSum, house) => houseSum + calculateHouseBalance(house), 0), 0
  );
  const activeHouses = partners.reduce((sum, partner) => sum + partner.houses.length, 0);
  const taxAmount = calculateTaxAmount(totalProfit);
  const showTaxAlert = totalProfit > 27500;

  const stats = [
    {
      title: "Parceiros Ativos",
      value: totalPartners.toString(),
      icon: Users,
      color: "text-blue-600",
      change: "+2 este mês"
    },
    {
      title: "Lucro Total",
      value: formatCurrency(totalProfit),
      icon: TrendingUp,
      color: totalProfit >= 0 ? "text-green-600" : "text-red-600",
      change: totalProfit >= 0 ? "+12.5%" : "-5.2%"
    },
    {
      title: "Saldo Total",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      color: "text-purple-600",
      change: "Atualizado agora"
    },
    {
      title: "Casas Ativas",
      value: activeHouses.toString(),
      icon: Building2,
      color: "text-orange-600",
      change: `${partners.length} parceiros`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu sistema de arbitragem</p>
        </div>
        <Link to="/parceiros">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Parceiro
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tax Alert */}
      {showTaxAlert && (
        <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800 dark:text-orange-200">Alerta Fiscal</AlertTitle>
          <AlertDescription className="text-orange-700 dark:text-orange-300">
            Seu lucro total excedeu R$ 27.500. Imposto devido: <strong>{formatCurrency(taxAmount)}</strong> (15% sobre {formatCurrency(totalProfit - 27500)})
          </AlertDescription>
        </Alert>
      )}

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Parceiros Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {partners.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhum parceiro cadastrado</p>
                <Link to="/parceiros">
                  <Button variant="outline" className="mt-4">
                    Cadastrar Primeiro Parceiro
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {partners.slice(0, 3).map((partner) => (
                  <div key={partner.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">{partner.cpf}</p>
                    </div>
                    <Badge variant={calculatePartnerProfit(partner.houses) > 0 ? "default" : "destructive"}>
                      {formatCurrency(calculatePartnerProfit(partner.houses))}
                    </Badge>
                  </div>
                ))}
                <Link to="/parceiros">
                  <Button variant="outline" className="w-full">
                    Ver Todos os Parceiros
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/parceiros">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Gerenciar Parceiros
              </Button>
            </Link>
            <Link to="/relatorios">
              <Button variant="outline" className="w-full justify-start gap-2">
                <AlertTriangle className="h-4 w-4" />
                Relatórios Fiscais
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Plus className="h-4 w-4" />
              Nova Movimentação
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
