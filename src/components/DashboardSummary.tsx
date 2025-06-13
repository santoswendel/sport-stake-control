
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp, Users, Wallet, Building2, AlertTriangle } from "lucide-react";
import { Partner } from "../types";
import { calculatePartnerProfit, calculateHouseBalance, formatCurrency, calculateTaxAmount } from "../lib/calculations";

interface DashboardSummaryProps {
  partners: Partner[];
}

export function DashboardSummary({ partners }: DashboardSummaryProps) {
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
      color: "text-blue-600"
    },
    {
      title: "Lucro Total",
      value: formatCurrency(totalProfit),
      icon: TrendingUp,
      color: totalProfit >= 0 ? "text-green-600" : "text-red-600"
    },
    {
      title: "Saldo Total",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      color: "text-purple-600"
    },
    {
      title: "Casas Ativas",
      value: activeHouses.toString(),
      icon: Building2,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
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
            </CardContent>
          </Card>
        ))}
      </div>

      {showTaxAlert && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800">Alerta Fiscal</AlertTitle>
          <AlertDescription className="text-orange-700">
            Seu lucro total excedeu R$ 27.500. Imposto devido: <strong>{formatCurrency(taxAmount)}</strong> (15% sobre {formatCurrency(totalProfit - 27500)})
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
