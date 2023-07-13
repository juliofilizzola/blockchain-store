## Rotas e retornos

### Offer

#### Criação e listagem de ofertas

Create Offer: -> post ``localhost:3333/offer``

Body:
````json
{
	"userId": "40502429-bab0-4b55-bf0a-6b69fba11c4a",
	"walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
	"price": 85,
	"quantity": 5,
	"name": "test Offer",
	"description": "Esse é o test de offer"
}
````

return:
````json
{
	"id": "7b548957-b0ca-4864-b222-aedef6617aa8",
	"name": "test Offer",
	"price": 85,
	"description": "Esse é o test de offer",
	"expiration": "2023-07-13T00:00:00.000Z",
	"active": true,
	"quantity": 5,
	"walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
	"createdAt": "2023-07-12T22:59:50.480Z",
	"updatedAt": "2023-07-12T22:59:50.480Z",
	"deletedAt": null
}
````
-----
Get Offer: -> get ``localhost:3333/offer``

Retorno sem paginação:
````json
[
	{
		"id": "7d69d5b4-8724-45fc-9be5-bf8dc7bdc050",
		"name": "test Offer",
		"price": 85,
		"description": "Esse é o test de offer",
		"expiration": "2023-07-14T00:00:00.000Z",
		"active": true,
		"quantity": 5,
		"walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
		"createdAt": "2023-07-13T00:14:03.379Z",
		"updatedAt": "2023-07-13T00:14:03.379Z",
		"deletedAt": null
	}
]
````

Rota com paginação: ``http://localhost:3333/offer?page=1&limit=10``
````json
{
	"data": [
		{
			"id": "7d69d5b4-8724-45fc-9be5-bf8dc7bdc050",
			"name": "test Offer",
			"price": 85,
			"description": "Esse é o test de offer",
			"expiration": "2023-07-14T00:00:00.000Z",
			"active": true,
			"quantity": 5,
			"walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
			"createdAt": "2023-07-13T00:14:03.379Z",
			"updatedAt": "2023-07-13T00:14:03.379Z",
			"deletedAt": null
		}
	],
	"count": 1,
	"currentPage": 1,
	"nextPage": null,
	"prevPage": null,
	"lastPage": 1
}
````


-----
Get Offer by user: -> get ``localhost:3333/offer/byUser/:userId``

Request: ````localhost:3333/offer/byUser/32d5cb4b-45ac-4b86-8307-af0a04da3144````

Retorno sem paginação:
````json
[
	{
		"id": "7d69d5b4-8724-45fc-9be5-bf8dc7bdc050",
		"name": "test Offer",
		"price": 85,
		"description": "Esse é o test de offer",
		"expiration": "2023-07-14T00:00:00.000Z",
		"active": true,
		"quantity": 5,
		"walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
		"createdAt": "2023-07-13T00:14:03.379Z",
		"updatedAt": "2023-07-13T00:14:03.379Z",
		"deletedAt": null
	}
]
````

Rota com paginação: ``http://localhost:3333/offer?page=1&limit=10``
````json
{
	"data": [
		{
			"id": "7d69d5b4-8724-45fc-9be5-bf8dc7bdc050",
			"name": "test Offer",
			"price": 85,
			"description": "Esse é o test de offer",
			"expiration": "2023-07-14T00:00:00.000Z",
			"active": true,
			"quantity": 5,
			"walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
			"createdAt": "2023-07-13T00:14:03.379Z",
			"updatedAt": "2023-07-13T00:14:03.379Z",
			"deletedAt": null
		}
	],
	"count": 1,
	"currentPage": 1,
	"nextPage": null,
	"prevPage": null,
	"lastPage": 1
}
````


----

GET Offer by id : -> Get ``localhost:3333/offer/one/:offerId``

Request: ````localhost:3333/offer/one/32d5cb4b-45ac-4b86-8307-af0a04da3144````

````json
{
    "id": "7d69d5b4-8724-45fc-9be5-bf8dc7bdc050",
    "name": "test Offer",
    "price": 85,
    "description": "Esse é o test de offer",
    "expiration": "2023-07-14T00:00:00.000Z",
    "active": true,
    "quantity": 5,
    "walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
    "createdAt": "2023-07-13T00:14:03.379Z",
    "updatedAt": "2023-07-13T00:14:03.379Z",
    "deletedAt": null
}
````

----

Remove Offer  : -> Delete ``localhost:3333/offer/remve/:offerId/:userid``

Request: ````http://localhost:3333/offer/remove/7d69d5b4-8724-45fc-9be5-bf8dc7bdc050/40502429-bab0-4b55-bf0a-6b69fba11c4a````

````json
{
    "id": "7d69d5b4-8724-45fc-9be5-bf8dc7bdc050",
    "name": "test Offer",
    "price": 85,
    "description": "Esse é o test de offer",
    "expiration": "2023-07-14T00:00:00.000Z",
    "active": true,
    "quantity": 5,
    "walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
    "createdAt": "2023-07-13T00:14:03.379Z",
    "updatedAt": "2023-07-13T00:14:03.379Z",
    "deletedAt": null
}
````


---

### Purchase

#### compra de ofertas

Purchase  : -> Post ``localhost:3333/purchase``

Body:
````json
{
	"offerId": "7b548957-b0ca-4864-b222-aedef6617aa8",
	"walletId": "32d5cb4b-45ac-4b86-8307-af0a04da3144",
	"price": 85,
	"quantity": 2,
	"amount": 256,
	"methodPayment": "pix",
	"name": "test Offer",
	"description": "Esse é o test de offer"
}

````
Retorno
````json
{
  "id": "42ff1a27-c175-48f0-a51a-f64a84b2de14",
  "offerId": "7b548957-b0ca-4864-b222-aedef6617aa8",
  "quantity": 2,
  "methodPayment": "pix",
  "amountPaid": 256,
  "userId": "40502429-bab0-4b55-bf0a-6b69fba11c4a",
  "createdAt": "2023-07-13T11:39:53.905Z",
  "updatedAt": "2023-07-13T11:39:53.905Z",
  "deletedAt": null
}
````