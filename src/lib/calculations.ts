
import { BettingHouse, Movement } from '../types';

export function calculateHouseBalance(house: BettingHouse): number {
  const totalDeposits = house.movements
    .filter(m => m.type === 'deposit')
    .reduce((sum, m) => sum + m.amount, 0);
  
  const totalWithdrawals = house.movements
    .filter(m => m.type === 'withdrawal')
    .reduce((sum, m) => sum + m.amount, 0);
    
  return house.initialBalance + totalDeposits - totalWithdrawals;
}

export function calculateHouseProfit(house: BettingHouse): number {
  const finalBalance = calculateHouseBalance(house);
  return finalBalance - house.initialBalance;
}

export function calculatePartnerProfit(houses: BettingHouse[]): number {
  return houses.reduce((total, house) => total + calculateHouseProfit(house), 0);
}

export function calculateTaxAmount(profit: number): number {
  const taxThreshold = 27500;
  if (profit <= taxThreshold) return 0;
  return (profit - taxThreshold) * 0.15;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 > 9) digit1 = 0;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 > 9) digit2 = 0;
  
  return digit1 === parseInt(cleanCPF[9]) && digit2 === parseInt(cleanCPF[10]);
}
