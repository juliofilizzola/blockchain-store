# Blockchain-store

Aplicação de teste

## Sobre o projeto

O projeto foi feito com o ‘framework’ Nestjs, e utilizando Postgres como Banco de dados e o Prisma como ORM, e outras dependencias com desenvolvimento do mesmo.

Foi utilizado

 - Nest Js : ``versão 10``
 - Prisma: ``versão 4.16.2``
 - Postegres: ```versão alpine```
 - Node: ``version 20.4.0``
 
## Iniciação do projeto
Para inciar o projeto, criei um arquivo Makefile para a melhor execução do código.

- DB:
    - para o banco de dados foi utilizado o docker compose para inciado com as configurações de user baseadas no env
- Prisma: 
  - Para a ORM, foi utilizado algumas configurações para satisfazer pontos do projeto (``soft delete``)
- Server:
  - para rodar o projeto, recomenda-se a versão 18 ou mais.
  - foi utilizado Yarn como package maneger.
- Makefile:
  - sobre ele deixei um doc especifico [aqui](./doc/makefile.md).
- Rotas:
  - Sobre rotas, deixei um doc com cada rota criada [aqui](./doc/rotas.md)

  

## O que pode ser feito para melhorar ou implementado 

Aqui vou deixar alguns pontos que poderiam ser melhorados

- Banco de dados: um bom levantamento de requisito e um mapeamento poderia deixar o banco mais performatico.
- Testes: poderia ser feito testes unitarios na aplicação, principalmente na rota de venda.
- Docker: addicionar a aplicação toda no docker, não só o Banco de dados.
- Swegger: implementação para melhor documentação da api.