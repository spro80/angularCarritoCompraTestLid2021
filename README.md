# angularCarritoCompraTestLid2021


## MANUAL:

### 1.- RUN ANGULAR IN LOCAL WITH DOCKER:
#### Execute the follow commands in directory root of the project:
ng build --prod
docker build -t angular-shooping-cart-2021-image .
docker run --name angular-shooping-cart-2021-container -d -p 8080:80 angular-shooping-cart-2021-image

#### Open the navigator and must enter: http://localhost:8080/ you will see that it’s running!






