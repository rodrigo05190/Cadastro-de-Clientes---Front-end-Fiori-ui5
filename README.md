Cadastro de clientes Sap Fiori/UI5/SAP GATEWAY/ODATA/JAVASCRIPT/CDSVIEW/ECPLIPSE/SAP GUI


Backend
Criação de tabelas no eclipse.
Modelagem de dados.
Criação das cds view, para criação do serviço odata(protocolo baseado em rest , seleciona e manipulados, consumido por qualquer tecnologia). (definida na camada de aplicação, independe do banco de dados.)
Depois acessei a transação segw(sap gui) , para geração dos serviços ODATA no sap gateway, la configurei 
Entidades, as propriedades da entidades,os entity set as associações, (navegação e expand) e criei o um function Import para o login. 
Na classe dpc(sap gui) fiz as redefinição dos métodos crud padrões e das entidades (create_entity,delete_entity,get_entity,get_entityset) 
depois de terminar essa camada fiz o teste (acessando a transação gw client)-  sap gateway client.

FrontEnd
Fiz a instalação do vscode , node ,install ui5 ultima versão é a libs do sap firoi no vscode.
No manifest , configurei a versão do aplicativo , a url do serviço oData
o tipo tecnologia ui5 e os dispositivos permitidos (desktop,tablet,phone), logo depois as rotas e os targets.
Fiz a criação dos controllers e suas views , usando o mesmo nome por convenção.
Nos controllers -  fiz as funções(perform do abap), validações, chame os métodos do model, para operações de escrita(crud), e aqui também trabalhei com as logica do sistema. 
Nesse mesmo escopo trabalhei, fiz integrações com serviços externos buscando cep e envio de emails.
Como model usei o tipo odata model, para comunicação com o servico o data.
na View , exibe os dados e elementos de interface do usuário.
Trabalhei também com data bindind , para automatizar transferência de dados entre views e model e vice versa.
tipos utilizados
property bind(associar propriedades de um controle de dados de um modelo)
agregation bind(tabelas e combobox)
element bing(associar um controle ui, para 1 registro específico)
Expression Binding(que são lógicas, escritas diretamente na view )




![Captura de tela 2024-04-04 150132](https://github.com/rodrigo05190/Cadastro-de-Clientes---Front-end-Fiori-ui5/assets/130502125/7a48f5e3-b4f3-43cf-8164-092a1f63b0c7)
![tela2-Captura de tela 2024-04-04 150222](https://github.com/rodrigo05190/Cadastro-de-Clientes---Front-end-Fiori-ui5/assets/130502125/fcbda390-a639-46b2-a1da-55de1a713d64)
![tela3-Captura de tela 2024-04-04 150252](https://github.com/rodrigo05190/Cadastro-de-Clientes---Front-end-Fiori-ui5/assets/130502125/d97b5872-68ae-4d03-9052-8039fcbfc1a6)


