import {
  FooterContainer,
  Link,
  FooterLinks,
  FooterSection,
  SectionTitle
} from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <FooterContainer>
    <div className="container">
      <FooterSection>
        <SectionTitle>Categorias</SectionTitle>
        <FooterLinks>
          <li>
            <Link to="/categorias/#action">Ação</Link>
          </li>
          <li>
            <Link to="/categorias/#sports">Esportes</Link>
          </li>
          <li>
            <Link to="/categorias/#fight">Luta</Link>
          </li>
          <li>
            <Link to="/categorias/#rpg">RPG</Link>
          </li>
          <li>
            <Link to="/categorias/#simulation">Simulação</Link>
          </li>
        </FooterLinks>
      </FooterSection>
      <FooterSection>
        <SectionTitle>Acesso rápido</SectionTitle>
        <FooterLinks>
          <li>
            <Link to="/#on-sale">Promoções</Link>
          </li>
          <li>
            <Link to="/#coming-soon">Em breve</Link>
          </li>
        </FooterLinks>
      </FooterSection>
      <FooterSection>
        <p>{currentYear} - &copy;E-PLAY todos os direitos reservados </p>
      </FooterSection>
    </div>
  </FooterContainer>
)

export default Footer
