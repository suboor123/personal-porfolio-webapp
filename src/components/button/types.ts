export type UserButtonProps = {
    children: JSX.Element | JSX.Element[] | string; 
    type: ButtonType;
    onClick?: () => void | Promise<void>;
    routerLink?: string;
}

export type ButtonType = 'primary' | 'outline';

export const getButtonClassName = (buttonType: ButtonType) => {
    switch (buttonType) {
        case 'primary':
            return 'btn-fill btn-create'
        case 'outline':
            return 'btn-outline2 btn-wallet text-white'
    }
}