
import { Partner } from "../types";

export const mockPartners: Partner[] = [
  {
    id: "p001",
    name: "Carlos Henrique Santos",
    cpf: "12345678901",
    notes: "Parceiro experiente em arbitragem",
    createdAt: new Date("2024-01-15"),
    houses: [
      {
        id: "h001",
        partnerId: "p001",
        name: "KTO",
        username: "carlos123",
        password: "****",
        isVerified: true,
        initialBalance: 2000,
        movements: [
          {
            id: "m001",
            houseId: "h001",
            type: "deposit",
            amount: 5000,
            date: new Date("2024-03-01"),
            notes: "Depósito inicial para arbitragem"
          },
          {
            id: "m002",
            houseId: "h001",
            type: "withdrawal",
            amount: 1200,
            date: new Date("2024-03-05"),
            notes: "Saque de lucros"
          },
          {
            id: "m003",
            houseId: "h001",
            type: "deposit",
            amount: 3000,
            date: new Date("2024-03-10"),
            notes: "Novo aporte"
          },
          {
            id: "m004",
            houseId: "h001",
            type: "withdrawal",
            amount: 2500,
            date: new Date("2024-03-15"),
            notes: "Retirada parcial"
          }
        ]
      },
      {
        id: "h002",
        partnerId: "p001",
        name: "Betano",
        username: "carlosbet",
        password: "****",
        isVerified: true,
        initialBalance: 1500,
        movements: [
          {
            id: "m005",
            houseId: "h002",
            type: "deposit",
            amount: 4000,
            date: new Date("2024-03-02"),
            notes: "Transferência para Betano"
          },
          {
            id: "m006",
            houseId: "h002",
            type: "withdrawal",
            amount: 800,
            date: new Date("2024-03-08"),
            notes: "Saque de ganhos"
          }
        ]
      }
    ]
  },
  {
    id: "p002",
    name: "Ana Paula Oliveira",
    cpf: "98765432100",
    notes: "Especialista em futebol internacional",
    createdAt: new Date("2024-02-01"),
    houses: [
      {
        id: "h003",
        partnerId: "p002",
        name: "Bet365",
        username: "anapaula",
        password: "****",
        isVerified: true,
        initialBalance: 3000,
        movements: [
          {
            id: "m007",
            houseId: "h003",
            type: "deposit",
            amount: 15000,
            date: new Date("2024-02-15"),
            notes: "Grande investimento em Copa"
          },
          {
            id: "m008",
            houseId: "h003",
            type: "withdrawal",
            amount: 8000,
            date: new Date("2024-02-25"),
            notes: "Primeira retirada"
          },
          {
            id: "m009",
            houseId: "h003",
            type: "withdrawal",
            amount: 12000,
            date: new Date("2024-03-12"),
            notes: "Lucros significativos"
          }
        ]
      },
      {
        id: "h004",
        partnerId: "p002",
        name: "Stake",
        username: "ana_stake",
        password: "****",
        isVerified: false,
        initialBalance: 2000,
        movements: [
          {
            id: "m010",
            houseId: "h004",
            type: "deposit",
            amount: 8000,
            date: new Date("2024-03-01"),
            notes: "Novo investimento"
          },
          {
            id: "m011",
            houseId: "h004",
            type: "withdrawal",
            amount: 3500,
            date: new Date("2024-03-14"),
            notes: "Saque parcial"
          }
        ]
      }
    ]
  },
  {
    id: "p003",
    name: "Roberto Silva Nunes",
    cpf: "11122233344",
    notes: "Focado em basquete americano",
    createdAt: new Date("2024-01-20"),
    houses: [
      {
        id: "h005",
        partnerId: "p003",
        name: "Sportingbet",
        username: "roberto_sports",
        password: "****",
        isVerified: true,
        initialBalance: 1000,
        movements: [
          {
            id: "m012",
            houseId: "h005",
            type: "deposit",
            amount: 2500,
            date: new Date("2024-02-10"),
            notes: "Investimento em NBA"
          },
          {
            id: "m013",
            houseId: "h005",
            type: "withdrawal",
            amount: 1800,
            date: new Date("2024-02-20"),
            notes: "Retirada de lucros"
          }
        ]
      }
    ]
  },
  {
    id: "p004",
    name: "Mariana Costa Lima",
    cpf: "55566677788",
    notes: "Especialista em tênis",
    createdAt: new Date("2024-02-10"),
    houses: [
      {
        id: "h006",
        partnerId: "p004",
        name: "Bwin",
        username: "mari_tennis",
        password: "****",
        isVerified: true,
        initialBalance: 5000,
        movements: [
          {
            id: "m014",
            houseId: "h006",
            type: "deposit",
            amount: 25000,
            date: new Date("2024-02-15"),
            notes: "Grande investimento Wimbledon"
          },
          {
            id: "m015",
            houseId: "h006",
            type: "withdrawal",
            amount: 18000,
            date: new Date("2024-03-01"),
            notes: "Lucros excepcionais"
          },
          {
            id: "m016",
            houseId: "h006",
            type: "withdrawal",
            amount: 15000,
            date: new Date("2024-03-10"),
            notes: "Segunda retirada"
          }
        ]
      },
      {
        id: "h007",
        partnerId: "p004",
        name: "1xBet",
        username: "mariana1x",
        password: "****",
        isVerified: true,
        initialBalance: 3000,
        movements: [
          {
            id: "m017",
            houseId: "h007",
            type: "deposit",
            amount: 12000,
            date: new Date("2024-02-20"),
            notes: "Complemento de estratégia"
          },
          {
            id: "m018",
            houseId: "h007",
            type: "withdrawal",
            amount: 8500,
            date: new Date("2024-03-05"),
            notes: "Retirada estratégica"
          }
        ]
      }
    ]
  },
  {
    id: "p005",
    name: "Fernando Almeida",
    cpf: "99988877766",
    notes: "Trader experiente em e-sports",
    createdAt: new Date("2024-01-05"),
    houses: [
      {
        id: "h008",
        partnerId: "p005",
        name: "Pinnacle",
        username: "fernando_pin",
        password: "****",
        isVerified: true,
        initialBalance: 8000,
        movements: [
          {
            id: "m019",
            houseId: "h008",
            type: "deposit",
            amount: 40000,
            date: new Date("2024-01-10"),
            notes: "Investimento em CS:GO Major"
          },
          {
            id: "m020",
            houseId: "h008",
            type: "withdrawal",
            amount: 25000,
            date: new Date("2024-01-25"),
            notes: "Lucros do Major"
          },
          {
            id: "m021",
            houseId: "h008",
            type: "deposit",
            amount: 20000,
            date: new Date("2024-02-05"),
            notes: "Novo ciclo League of Legends"
          },
          {
            id: "m022",
            houseId: "h008",
            type: "withdrawal",
            amount: 30000,
            date: new Date("2024-02-28"),
            notes: "Ganhos extraordinários"
          }
        ]
      }
    ]
  }
];

// Initialize localStorage with mock data if empty
export const initializeMockData = () => {
  const existingPartners = localStorage.getItem('partners');
  if (!existingPartners || JSON.parse(existingPartners).length === 0) {
    localStorage.setItem('partners', JSON.stringify(mockPartners));
  }
};
