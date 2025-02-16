
import { Button, createTheme } from "@mantine/core";

export const theme = createTheme({
    components: {
        Button:{
            styles: (theme, props) =>{
               if (props.variant === 'submitButton') {
                    return {
                        root : {
                            height : '30px',
                            background: 'var(--mantine-color-myColor-7)',
                            width: '100%',
                            color: 'var(--mantine-color-myColor-0)',
                            textAlign: 'center',
                            marginBottom: '10px',
                            '&:hover': {
                                background: 'var(--mantine-color-myColor-7)',
                                color: 'var(--mantine-color-myColor-1)',
                                transform: 'scale(1.05)',
                                transition: 'all 0.3s ease',
                            }
                        }
                    }
                }
                return {
                    root: {}
                }
            }
        }
    },
    // Cores personalizadas
    colors: {
      myColor: [
        '#e0f2ff', // Tom mais claro
        '#b3d9ff',
        '#80bfff',
        '#4da6ff',
        '#1a8cff',
        '#0073e6', // Cor principal
        '#005ab3',
        '#004080',
        '#00254d',
        '#000a1a', // Tom mais escuro
      ],
    },

    // Fonte principal
    fontFamily: 'Inter, sans-serif',

    // Tamanhos de fonte
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },

    // Espaçamentos
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },

    // Breakpoints para responsividade
    breakpoints: {
      xs: '36em', // 576px
      sm: '48em', // 768px
      md: '62em', // 992px
      lg: '75em', // 1200px
      xl: '88em', // 1408px
    },

    // Outras personalizações
    primaryColor: 'myColor', // Define a cor primária como 'myColor'
    defaultRadius: 'md', // Bordas arredondadas padrão
});

