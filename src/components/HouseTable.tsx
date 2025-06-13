
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { BettingHouse } from "../types";
import { calculateHouseBalance, calculateHouseProfit, formatCurrency } from "../lib/calculations";

interface HouseTableProps {
  houses: BettingHouse[];
  onAddHouse: () => void;
  onEditHouse: (house: BettingHouse) => void;
  onDeleteHouse: (houseId: string) => void;
  onAddMovement: (houseId: string) => void;
}

export function HouseTable({ houses, onAddHouse, onEditHouse, onDeleteHouse, onAddMovement }: HouseTableProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (houseId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [houseId]: !prev[houseId]
    }));
  };

  if (houses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Casas de Apostas</CardTitle>
            <Button onClick={onAddHouse}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Casa
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>Nenhuma casa de apostas cadastrada</p>
            <p className="text-sm">Clique em "Adicionar Casa" para começar</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Casas de Apostas ({houses.length})</CardTitle>
          <Button onClick={onAddHouse}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Casa
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Casa</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Senha</TableHead>
                <TableHead>Verificação</TableHead>
                <TableHead className="text-right">Saldo Inicial</TableHead>
                <TableHead className="text-right">Saldo Atual</TableHead>
                <TableHead className="text-right">Lucro/Prejuízo</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {houses.map((house) => {
                const currentBalance = calculateHouseBalance(house);
                const profit = calculateHouseProfit(house);
                const isPasswordVisible = showPasswords[house.id];
                
                return (
                  <TableRow key={house.id}>
                    <TableCell className="font-medium">{house.name}</TableCell>
                    <TableCell>{house.username || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {house.password ? (
                          <>
                            <span className="font-mono text-sm">
                              {isPasswordVisible ? house.password : '••••••••'}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePasswordVisibility(house.id)}
                            >
                              {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </>
                        ) : (
                          '-'
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={house.isVerified ? "default" : "secondary"}>
                        {house.isVerified ? 'Verificado' : 'Pendente'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(house.initialBalance)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(currentBalance)}</TableCell>
                    <TableCell className={`text-right font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(profit)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onAddMovement(house.id)}
                          title="Adicionar movimentação"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditHouse(house)}
                          title="Editar casa"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteHouse(house.id)}
                          title="Excluir casa"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
