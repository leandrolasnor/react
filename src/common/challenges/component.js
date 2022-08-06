import { Row, Col } from "react-bootstrap"
export const MusicCollection = props => {

  let Texto = props => {
    return (
      <Col lg={12} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        <p>O back-end foi construido em RubyOnRails no formato de API.<br/>
        Nele se encontram as camadas Controle e Modelo da arquitetura MVC.</p>
        <p>Detalhes importantes sobre a implementação:</p>
        <ul>
          <li>gem <i>devise_token_auth para Autenticação</i></li>
          <li>Executa tarefas assincronas usando o sidekiq</li>
          <li>Canal autenticado de comunicação com o front-end via WebSocket</li>
          <li>Para executar os testes <i>docker compose exec api rspec spec</i></li>
        </ul>
      </Col>
    )
  }

  return (
    <Row>
      <Texto />
    </Row>
  )
}

export const Arquitetura = props => {

  let Texto = props => {
    return (
      <Col lg={12} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        <p>
        O projeto foi montado ao estilo MVC (Model View Controller), sendo o framework RubyOnRails detentor das camadas de Modelo e Controle e
        o React sendo detentor da camada de Visão. Ambas as partes estão rodando através de containers do Docker
        e para atender as necessidades do desafio, foi necessário acrescentar novos elementos ao projeto, como o Sidekiq e o Redis.
        Mas sobre a pespectiva do Docker, o avaliador poderá observar que o projeto não está divido em apenas duas partes. 
        </p>
        <ol>
          <li>api: container onde roda a aplicação Rails(Modelo e Controle)</li>
          <li>front: container onde roda a aplicação React(Visão)</li>
          <li>redis: container onde roda o serviço de armazenamento em memória</li>
          <li>db: container onde roda o serviço de banco de dados MySQL</li>
          <li>sidekiq: container onde roda o serviço de processamento assíncrono</li>
        </ol>
       <p>
        Estes cinco containers podem ser entendidos simplesmente como pequenos servidores, que juntos formarão um cluster.
        Essa subdivisão eleva o potencial de disponibilidade e de capacidade de atuação da aplicação como um todo.
        </p>

      </Col>
    )
  }

  return (
    <Row>
      <Texto />
    </Row>
  )
}

export const Sidekiq = props => {

  let Texto = props => {
    return (
      <Col lg={12} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        <p>Com a finalidade de tornas este desafio um pouco mais dinamico e agil, foi introduzido o Sidekiq para implementar rotinas custosas de regra de negócio.</p>
        <p>Como funciona?</p>
        <ol>
          <li>O usuário escolhe um arquivo com extensão .tab pelo app front-end em React</li>
          <li>O React faz a requisição POST enviando o arquivo .tab para o Rails API</li>
          <li>A API recebe este arquivo via end-point "/upload" e salva o arquivo na pasta <i>/storage</i> na raiz do projeto Rails</li>
          <li>A API responde a requisição com um indicador de sucesso e uma mensagem dizendo que o arquivo foi aceito com sucesso.</li>
          <li>Uma notificação é disparada na tela do usuário ao final da requisição de upload</li>
        </ol>
        <p>
          Nessa etapa aceitamos e armazenamos o arquivo no servidor rails, mas ainda não o importamos para o banco de dados.
        </p>
        <p>
          A etapa de importação é feita de forma assincrona pelo Sidekiq e sua chamada ocorre ao final da execução do end-point /upload - Segue os passos de execução:
        </p>
        <ol>
          <li>O arquivo recém salvo é aberto em memória</li>
          <li>Iteramos sobre o arquivo e em cada iteração pegamos os dados da linha e armazenamos na base de dados</li>
          <li>Quando a iteração termina o arquivo é excluído</li>
          <li>Através de WebSocket enviamos uma notificação ao usuário informando que a importação foi concluída com sucesso.</li>
        </ol>
      </Col>
    )
  }

  return (
    <Row>
      <Texto />
    </Row>
  )
}

export const Front = props => {

  let Texto = props => {
    return (
      <Col lg={12} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        <p>Nossa aplicação React representa a camada de Visão da arquitetura MVC e esta organizada da seguinte forma:</p>
        <ul>
          <li>O projeto de front-end foi construído a partir do create-react-app.</li>
          <li>Os componentes foram divididos entre duas categorias: principal e comum.</li>
            <ul>
              <li>Componente Principal: Componente de rota que representa o acesso do usuário a determinada parte do app. O único componente desse tipo implementado é o Home</li>
              <li>Componente Comum: Utilizado e reutilizado para compor pequenas partes visuais ou oferecer alguma funcionalidade específica. Estes ficam localizados dentro da pasta common</li>
            </ul>
          <li>O primeiro componente a se renderizado é o AuthOrApp</li>
        </ul>
        O redux foi utilizado para ajudar na centralização e compartilhamento do estado global da aplicação.
        A utilização deste não impossibilita se trabalhar com estado local em cada componente, seja ele principal ou comum.
        <p>
          Principais dependencias
        </p>
        <ul>
          <li>@thrash-industries/react-actioncable-provider</li>
          <li>react-bootstrap</li>
          <li>react-dropzone-uploader</li>
          <li>lodash</li>
          <li>axios</li>
        </ul>
      </Col>
    )
  }

  return (
    <Row>
      <Texto />
    </Row>
  )
}

export const Database = props => {
  let Texto = props => {
    return (
      <Col lg={12} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        <p>
          O banco de dados escolhido para este desafio foi o MySQL por si tratar de um banco de dados relacional.<br/>
          Requisito obrigatório do desafio.
        </p>
        <p>
          No momento em que o serviço de banco de dados fica disponível, um script de inicialização é executado. Este script faz a criação das tabelas <i>users</i> <i>sales</i> <i>jobs</i><br/>
          Após a estrutura ser criada, dois usuários de teste são inseridos na tabela <i>users</i>
        </p>
        <p>
          <i>teste@teste.com - 123456</i>
          
        </p>
        <p>
          <i>outro_teste@teste.com - 123456</i>
        </p>
      </Col>
    )
  }

  return (
    <Row>
      <Texto />
    </Row>
  )
}

export const Auth = props => {
  let Texto = props => {
    return (
      <Col lg={12} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        <p>A autenticação nesse projeto esta sendo administrada pela gem <i>devise_token_auth</i>. Essa dependencia nos trás uma gama de métodos que tratam da autenticação e do gerenciamento de tokens.</p>
        <p>
          Na parte do front-end existem eventos no <i>reducer</i> do componente principal <i>auth</i> que faz a atualização do token para fazer o <i>refresh</i> do token a cada requisição.
          Mas essa função não foi adotada nesse desafio. A gem se encontra configurada para manter o mesmo token desde o login até o logout. Mas se fossemos colocar este app em produção, o recomendado seria fazer a troca do token manualmente.
          O motivo por não adotar a troca de token a cada requisição é por conta do websocket. A cada vez que se troca o token, o websocket desconecta e conecta novamente.
          Portanto, para o ambiente de produção o recomendado seria manter a troca do token desabilitada e fazer a troca de forma manual.
        </p>
        <ul>
          <li>teste@teste.com - 123456</li>
          <li>outro_teste@teste.com - 123456</li>
        </ul>
      </Col>
    )
  }

  return (
    <Row>
      <Texto />
    </Row>
  )
}

export const Manual = props => {
  let Texto = props => {
    return (
      <Col lg={12} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        <ol><b>Upload</b>
          <li>Com app aberta na home, clique no dropzone no rodapé da página ou solte um arquivo com extensão .tab dentro do componente</li>
          <li>Assim que selecionar o arquivo o upload irá começar.</li>
          <li>Uma mensagem irá informar que o arquivo foi salvo com sucesso.</li>
          <li>Após alguns segundos uma barra de progresso na parte inferir da barra de navegação do app irá aparecer. Essa barra indica que o processo de importação esta sendo feito.</li>
          <li>Assim que a barra encher, uma notificação será exibida, indicando que o arquivo foi importado.</li>
        </ol>
        <ol><b>Total importado no período de 24hr</b>
          <li>Com app aberta na home, de um clique simples no trofel cinza localizado na barra de navegação.</li>
          <li>Uma consulta a base de dados será feita e o trofeu ficará amarelo brilhante e exibirá o valor total das vendas importadas nas últimas 24hr</li>
          <ol><b>Meus arquivos importados nas últimas 24hr</b>
            <li>Com app aberta na home, e o trofeu na cor amarela, de um clique duplo no trofeu</li>
            <li>Uma janela de dialogo irá aparecer com a lista de arquivos importados. Clique em mostrar mais para carregar os Jobs mais antigos. Mas lembre-se, nessa lista só irão aparecer os Jobs das últimas 24hr</li>
          </ol>
        </ol>
      </Col>
    )
  }

  return (
    <Row>
      <Texto />
    </Row>
  )
}

export const Responsive = props => {
  let Texto = props => {
    return (
      <Col lg={12} key={props.iKey} className="mr-0 ml-0 pl-1 pr-1 pb-0 mb-0">
        Todo a aplicação React foi construida utilizando a dependencia react-bootstrap. Todo o layout esta baseado no framework de interface Bootstrap.<br/>
        O quesito responsividade não foi exigido no desafio, mas o layout assim foi feito. O layout da aplicação é compatível e pode ser aberta em dispositivos móveis como smartphones ou tables.
      </Col>
    )
  }

  return (
    <Row>
      <Texto />
    </Row>
  )
}