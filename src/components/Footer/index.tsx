import * as S from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <S.FooterContainer>
    <div className="container">
      <S.FooterSection>
        <S.SectionTitle>Categorias</S.SectionTitle>
        <S.FooterLinks>
          <li>
            <S.Link
              title="Clique aqui para acessar os jogos de ação"
              to="/categorias/#action"
            >
              Ação
            </S.Link>
          </li>
          <li>
            <S.Link
              title="Clique aqui para acessar os jogos de esportes"
              to="/categorias/#sports"
            >
              Esportes
            </S.Link>
          </li>
          <li>
            <S.Link
              title="Clique aqui para acessar os jogos de luta"
              to="/categorias/#fight"
            >
              Luta
            </S.Link>
          </li>
          <li>
            <S.Link
              title="Clique aqui para acessar os jogos de RPG"
              to="/categorias/#rpg"
            >
              RPG
            </S.Link>
          </li>
          <li>
            <S.Link
              title="Clique aqui para acessar os jogos de simulação"
              to="/categorias/#simulation"
            >
              Simulação
            </S.Link>
          </li>
        </S.FooterLinks>
      </S.FooterSection>
      <S.FooterSection>
        <S.SectionTitle>Acesso rápido</S.SectionTitle>
        <S.FooterLinks>
          <li>
            <S.Link
              title="Clique aqui para acessar a seção de promoções"
              to="/#on-sale"
            >
              Promoções
            </S.Link>
          </li>
          <li>
            <S.Link
              title="Clique aqui para acessar a seção em breve"
              to="/#coming-soon"
            >
              Em breve
            </S.Link>
          </li>
        </S.FooterLinks>
      </S.FooterSection>
      <S.FooterSection>
        <p>{currentYear} - &copy;E-PLAY todos os direitos reservados </p>
      </S.FooterSection>
    </div>
  </S.FooterContainer>
)

export default Footer
