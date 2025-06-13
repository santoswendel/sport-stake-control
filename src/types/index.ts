
export interface Partner {
  id: string;
  name: string;
  cpf: string;
  notes?: string;
  createdAt: Date;
  houses: BettingHouse[];
}

export interface BettingHouse {
  id: string;
  partnerId: string;
  name: string;
  username?: string;
  password?: string;
  isVerified: boolean;
  initialBalance: number;
  movements: Movement[];
}

export interface Movement {
  id: string;
  houseId: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: Date;
  notes?: string;
}

export interface DashboardSummary {
  totalPartners: number;
  totalProfit: number;
  totalBalance: number;
  activeHouses: number;
  taxAlert: boolean;
}
