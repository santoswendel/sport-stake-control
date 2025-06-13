
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BarChart3, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: "Gestão de Parceiros",
      description: "Cadastre e gerencie todos os seus parceiros de arbitragem esportiva em um só lugar."
    },
    {
      icon: TrendingUp,
      title: "Controle de Lucros",
      description: "Acompanhe automaticamente os lucros e prejuízos de cada conta de apostas."
    },
    {
      icon: BarChart3,
      title: "Relatórios Fiscais",
      description: "Alertas automáticos para impostos e relatórios completos para declaração."
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Suas informações ficam protegidas com criptografia de ponta a ponta."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">ArbitrageHub</span>
          </div>
          <Link to="/dashboard">
            <Button>Entrar no Sistema</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Arbitragem Esportiva
          <br />
          Profissional
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Substitua suas planilhas por um sistema profissional de gestão de arbitragem esportiva. 
          Controle parceiros, lucros e relatórios fiscais automaticamente.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              Comece Agora <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para profissionalizar sua arbitragem?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Pare de usar planilhas e comece a usar um sistema profissional hoje mesmo.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              Entrar no Sistema <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
