
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Download, FileText, TrendingUp } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Partner } from "../types";
import { calculatePartnerProfit, formatCurrency, calculateTaxAmount, formatCPF } from "../lib/calculations";

export default function Relatorios() {
  const [partners] = useLocalStorage<Partner[]>('partners', []);
  
  const partnersWithHighProfit = partners.filter(partner => {
    const profit = calculatePartnerProfit(partner.houses);
    return profit > 27500;
  });

  const totalTaxableProfit = partnersWithHighProfit.reduce((sum, partner) => {
    const profit = calculatePartnerProfit(partner.houses);
    return sum + (profit - 27500);
  }, 0);

  const totalTaxAmount = calculateTaxAmount(partnersWithHighProfit.reduce((sum, partner) => {
    return sum + calculatePartnerProfit(partner.houses);
  }, 0));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Relatórios Fiscais</h1>
          <p className="text-muted-foreground">Acompanhe obrigações tributárias e alertas fiscais</p>
        </div>
        <Button className="gap-2" disabled>
          <Download className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      {/* Tax Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Parceiros Acima do Limite
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {partnersWithHighProfit.length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {partners.length} parceiros
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lucro Tributável
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalTaxableProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              Acima de R$ 27.500
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Imposto Devido
            </CardTitle>
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalTaxAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              15% sobre excedente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Alert */}
      {partnersWithHighProfit.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800 dark:text-orange-200">Atenção Fiscal</AlertTitle>
          <AlertDescription className="text-orange-700 dark:text-orange-300">
            {partnersWithHighProfit.length} parceiro(s) ultrapassaram o limite de isenção de R$ 27.500. 
            É necessário declarar e pagar imposto de 15% sobre o excedente.
          </AlertDescription>
        </Alert>
      )}

      {/* Partners with High Profit Table */}
      <Card>
        <CardHeader>
          <CardTitle>Parceiros com Obrigação Fiscal</CardTitle>
        </CardHeader>
        <CardContent>
          {partnersWithHighProfit.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma obrigação fiscal</h3>
              <p className="text-muted-foreground">
                Todos os parceiros estão dentro do limite de isenção de R$ 27.500
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parceiro</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead className="text-right">Lucro Total</TableHead>
                    <TableHead className="text-right">Excedente</TableHead>
                    <TableHead className="text-right">Imposto Devido</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnersWithHighProfit.map((partner) => {
                    const profit = calculatePartnerProfit(partner.houses);
                    const excess = profit - 27500;
                    const tax = calculateTaxAmount(profit);
                    
                    return (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>{formatCPF(partner.cpf)}</TableCell>
                        <TableCell className="text-right font-bold text-green-600">
                          {formatCurrency(profit)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(excess)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-red-600">
                          {formatCurrency(tax)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">
                            Declaração Obrigatória
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Partners Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Geral - Todos os Parceiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parceiro</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead className="text-right">Lucro Total</TableHead>
                  <TableHead>Status Fiscal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => {
                  const profit = calculatePartnerProfit(partner.houses);
                  const isOverLimit = profit > 27500;
                  
                  return (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">{partner.name}</TableCell>
                      <TableCell>{formatCPF(partner.cpf)}</TableCell>
                      <TableCell className={`text-right font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(profit)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isOverLimit ? "destructive" : "default"}>
                          {isOverLimit ? "Acima do Limite" : "Dentro do Limite"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
