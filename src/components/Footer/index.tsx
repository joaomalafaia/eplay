import {
  FooterContainer,
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
            <a href="#">RPG</a>
          </li>
          <li>
            <a href="#">Ação</a>
          </li>
          <li>
            <a href="#">Aventura</a>
          </li>
          <li>
            <a href="#">Esportes</a>
          </li>
          <li>
            <a href="#">Simulação</a>
          </li>
          <li>
            <a href="#">Estratégia</a>
          </li>
          <li>
            <a href="#">FPS</a>
          </li>
        </FooterLinks>
      </FooterSection>
      <FooterSection>
        <SectionTitle>Acesso rápido</SectionTitle>
        <FooterLinks>
          <li>
            <a href="#">Novidades</a>
          </li>
          <li>
            <a href="#">Promoções</a>
          </li>
          <li>
            <a href="#">Em breve</a>
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
