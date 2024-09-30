import HeaderDashboard from 'components/HeaderDashboard';

export default function ListBreadcrumb({ ui, model, pagesPath }) {
  const links = [{ name: model.name, href: pagesPath + model.name }];

  return <HeaderDashboard heading={model.name} links={links} />;
}
