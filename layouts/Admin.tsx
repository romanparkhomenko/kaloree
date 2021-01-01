import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouter } from 'next/router';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from '../components/Navbars/AdminNavbar';
import AdminFooter from '../components/Footers/AdminFooter';
import Sidebar from '../components/Sidebar/Sidebar';

import routes from '../routes.js';
import PageChange from '../components/PageChange/PageChange';
import { useSession } from 'next-auth/client';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  document.body.classList.add('body-page-transition');
  ReactDOM.render(<PageChange path={url} />, document.getElementById('page-transition'));
});
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});

type Props = {
  children: ReactNode[];
};

const Admin: React.FC<Props> = props => {
  // used for checking current route
  const router = useRouter();
  const [session] = useSession();
  const mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  return (
    <>
      {session && (
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: '/',
            imgSrc: require('assets/img/brand/nextjs_argon_black.png'),
            imgAlt: '...',
          }}
        />
      )}
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
