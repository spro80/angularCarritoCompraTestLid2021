# angularCarritoCompraTestLid2021


### 1.- RUN ANGULAR IN LOCAL:
#### Execute the follow commands in directory root of the project:
npm i
npm run start
#### Open navigator in:
localhost:4200





### 2.- RUN ANGULAR IN LOCAL WITH DOCKER:
#### Execute the follow commands in directory root of the project:
ng build --prod
docker build -t angular-shooping-cart-2021-image .
docker run --name angular-shooping-cart-2021-container -d -p 8080:80 angular-shooping-cart-2021-image

#### Open the navigator and must enter in: http://localhost:8080/ you will see that it’s running!





### 3.- DOCKER COMPOSE (ACTUALLY THIS PROJECT IS NOT WORKING WITH THIS OPTION):

#### In the root of project, execute this command:
angularCarritoCompraTestLid2021$ docker-compose build
angularCarritoCompraTestLid2021$ docker-compose up
docker images










### OTHER SECTIONS:
#### For remove image use:  docker rmi imageName

#### remove all containers
docker rm $(docker ps -aq)
#### Delete all containers
docker rm $(docker ps -aq)
##### Delete all images
docker rmi $(docker images -q)
##### Delete all untagged images
docker rmi $(docker images -q --filter "dangling=true")