import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { BettingHouse } from "../types";
import { calculateHouseBalance, calculateHouseProfit, formatCurrency } from "../lib/calculations";

interface HouseTableProps {
  houses: BettingHouse[];
  onCreateHouse: () => void;
}

export function HouseTable({ houses, onCreateHouse }: HouseTableProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Casas de Apostas</CardTitle>
        <Button onClick={onCreateHouse}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Casa
        </Button>
      </CardHeader>
      <CardContent>
        {houses.length === 0 ? (
          <div className="text-center py-4">
            <Building2 className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Nenhuma casa de aposta cadastrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                  <TableHead className="text-right">Lucro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {houses.map((house) => {
                  const balance = calculateHouseBalance(house);
                  const profit = calculateHouseProfit(house);
                  return (
                    <TableRow key={house.id}>
                      <TableCell className="font-medium">{house.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(balance)}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={profit >= 0 ? "default" : "destructive"}>
                          {formatCurrency(profit)}
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
  );
}
