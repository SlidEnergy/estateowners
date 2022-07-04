import React, {FC, PropsWithChildren} from 'react';
import {Container} from 'reactstrap';
import NavMenu from './NavMenu';

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div>
            <NavMenu/>
            <Container>
                {children}
            </Container>
        </div>
    );
}

export default Layout;