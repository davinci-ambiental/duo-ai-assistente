
import React from 'react';
import { FileText, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

type HeaderProps = {
  planType: 'PGRS' | 'PGRSS';
  onChangePlanType: (type: 'PGRS' | 'PGRSS') => void;
};

const Header: React.FC<HeaderProps> = ({ planType, onChangePlanType }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
            <img 
              src="/lovable-uploads/b2a7a54e-740d-46e1-917d-47e40886a9f8.png" 
              alt="DaVinci Consultoria Ambiental" 
              className="h-8 sm:h-10 md:h-12"
            />
            <div className="ml-1 sm:ml-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-davinci-darkGray">
                Assistente de {planType === 'PGRS' ? 'PGRS' : 'PGRSS'}
              </h1>
              <p className="text-xs sm:text-sm text-davinci-silver truncate max-w-[200px] sm:max-w-none">
                Elaboração de {planType === 'PGRS' 
                  ? 'Plano de Gerenciamento de Resíduos Sólidos' 
                  : 'Plano de Gerenciamento de Resíduos de Serviços de Saúde'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="bg-davinci-lightGray rounded-full p-1">
              <Button 
                variant={planType === 'PGRS' ? 'default' : 'outline'}
                className={cn(
                  "rounded-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm h-auto",
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
                  "rounded-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm h-auto",
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
              className="flex items-center gap-1 sm:gap-2 border-davinci-teal text-davinci-teal hover:bg-davinci-teal/10 text-xs sm:text-sm h-auto px-2 sm:px-4 py-1 sm:py-2"
              asChild
            >
              <Link to="/reports">
                <BarChart2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Relatórios</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
