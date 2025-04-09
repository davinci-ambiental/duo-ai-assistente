
import React, { useState } from 'react';
import Header from '@/components/Header';
import ThreeColumnLayout from '@/components/layout/ThreeColumnLayout';
import { FileText, BarChart2, ArrowLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

type ReportType = {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
};

const sampleReports: ReportType[] = [
  { 
    id: '1', 
    title: 'Relatório Mensal PGRS', 
    type: 'PGRS', 
    date: '15/03/2025',
    status: 'completed'
  },
  { 
    id: '2', 
    title: 'Relatório Trimestral PGRSS', 
    type: 'PGRSS', 
    date: '01/04/2025',
    status: 'in-progress'
  },
  { 
    id: '3', 
    title: 'Relatório Anual PGRS', 
    type: 'PGRS', 
    date: '20/04/2025',
    status: 'pending'
  },
  { 
    id: '4', 
    title: 'Relatório de Conformidade PGRSS', 
    type: 'PGRSS', 
    date: '30/04/2025',
    status: 'pending'
  },
];

const ReportsSidebar = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-4 text-davinci-darkGray">Filtros</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2 text-davinci-darkGray">Tipo de Plano</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="pgrs" className="mr-2" />
              <label htmlFor="pgrs" className="text-sm">PGRS</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="pgrss" className="mr-2" />
              <label htmlFor="pgrss" className="text-sm">PGRSS</label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2 text-davinci-darkGray">Status</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="completed" className="mr-2" />
              <label htmlFor="completed" className="text-sm">Concluído</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="in-progress" className="mr-2" />
              <label htmlFor="in-progress" className="text-sm">Em Andamento</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="pending" className="mr-2" />
              <label htmlFor="pending" className="text-sm">Pendente</label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2 text-davinci-darkGray">Período</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="last-month" className="mr-2" />
              <label htmlFor="last-month" className="text-sm">Último Mês</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="last-quarter" className="mr-2" />
              <label htmlFor="last-quarter" className="text-sm">Último Trimestre</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="last-year" className="mr-2" />
              <label htmlFor="last-year" className="text-sm">Último Ano</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="custom" className="mr-2" />
              <label htmlFor="custom" className="text-sm">Período Personalizado</label>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-davinci-teal hover:bg-davinci-teal/90">
          <Filter className="h-4 w-4 mr-2" />
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: ReportType['status'] }) => {
  const statusConfig = {
    'completed': { label: 'Concluído', color: 'bg-green-100 text-green-800' },
    'in-progress': { label: 'Em Andamento', color: 'bg-blue-100 text-blue-800' },
    'pending': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' }
  };
  
  const { label, color } = statusConfig[status];
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

const Reports: React.FC = () => {
  const [planType, setPlanType] = useState<'PGRS' | 'PGRSS'>('PGRS');
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header planType={planType} onChangePlanType={setPlanType} />
      
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6 flex items-center">
          <Button 
            variant="outline" 
            className="mr-4" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-davinci-darkGray">Relatórios</h1>
        </div>
        
        <ThreeColumnLayout
          leftSidebar={<ReportsSidebar />}
          mainContent={
            <div className="space-y-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full bg-davinci-lightGray">
                  <TabsTrigger value="all" className="flex-1">Todos os Relatórios</TabsTrigger>
                  <TabsTrigger value="pgrs" className="flex-1">PGRS</TabsTrigger>
                  <TabsTrigger value="pgrss" className="flex-1">PGRSS</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Todos os Relatórios</CardTitle>
                      <CardDescription>
                        Visualize e gerencie todos os relatórios de PGRS e PGRSS.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sampleReports.map((report) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.title}</TableCell>
                              <TableCell>{report.type}</TableCell>
                              <TableCell>{report.date}</TableCell>
                              <TableCell>
                                <StatusBadge status={report.status} />
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="text-davinci-teal border-davinci-teal hover:bg-davinci-teal/10">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Visualizar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Anterior</Button>
                      <div className="text-sm text-muted-foreground">
                        Página 1 de 1
                      </div>
                      <Button variant="outline">Próximo</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pgrs" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Relatórios PGRS</CardTitle>
                      <CardDescription>
                        Relatórios específicos do Plano de Gerenciamento de Resíduos Sólidos.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sampleReports.filter(r => r.type === 'PGRS').map((report) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.title}</TableCell>
                              <TableCell>{report.date}</TableCell>
                              <TableCell>
                                <StatusBadge status={report.status} />
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="text-davinci-teal border-davinci-teal hover:bg-davinci-teal/10">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Visualizar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pgrss" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Relatórios PGRSS</CardTitle>
                      <CardDescription>
                        Relatórios específicos do Plano de Gerenciamento de Resíduos de Serviços de Saúde.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sampleReports.filter(r => r.type === 'PGRSS').map((report) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.title}</TableCell>
                              <TableCell>{report.date}</TableCell>
                              <TableCell>
                                <StatusBadge status={report.status} />
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" className="text-davinci-teal border-davinci-teal hover:bg-davinci-teal/10">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Visualizar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default Reports;
