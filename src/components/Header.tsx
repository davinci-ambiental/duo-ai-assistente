
import React from 'react';
import { FileText, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderProps = {
  planType: 'PGRS' | 'PGRSS';
  onChangePlanType: (type: 'PGRS' | 'PGRSS') => void;
};

const Header: React.FC<HeaderProps> = ({ planType, onChangePlanType }) => {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/b2a7a54e-740d-46e1-917d-47e40886a9f8.png" 
              alt="DaVinci Consultoria Ambiental" 
              className="h-12"
            />
            <div className="ml-2">
              <h1 className="text-2xl font-bold text-davinci-darkGray">
                Assistente de {planType === 'PGRS' ? 'PGRS' : 'PGRSS'}
              </h1>
              <p className="text-sm text-davinci-silver">
                Elaboração de {planType === 'PGRS' 
                  ? 'Plano de Gerenciamento de Resíduos Sólidos' 
                  : 'Plano de Gerenciamento de Resíduos de Serviços de Saúde'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-davinci-lightGray rounded-full p-1">
              <Button 
                variant={planType === 'PGRS' ? 'default' : 'outline'}
                className={cn(
                  "rounded-full px-4",
                  planType === 'PGRS' 
                    ? 'bg-davinci-teal text-white hover:bg-davinci-teal/90' 
                    : 'bg-transparent text-davinci-darkGray hover:bg-davinci-lightGray/50'
                )}
                onClick={() => onChangePlanType('PGRS')}
              >
                PGRS
              </Button>
              <Button 
                variant={planType === 'PGRSS' ? 'default' : 'outline'}
                className={cn(
                  "rounded-full px-4",
                  planType === 'PGRSS' 
                    ? 'bg-davinci-teal text-white hover:bg-davinci-teal/90' 
                    : 'bg-transparent text-davinci-darkGray hover:bg-davinci-lightGray/50'
                )}
                onClick={() => onChangePlanType('PGRSS')}
              >
                PGRSS
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 border-davinci-teal text-davinci-teal hover:bg-davinci-teal/10"
            >
              <BarChart2 className="h-4 w-4" />
              <span>Relatórios</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
