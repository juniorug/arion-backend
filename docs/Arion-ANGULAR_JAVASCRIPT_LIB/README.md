# Getting started

API's collection for Arion project

## How to Build

The generated SDK requires AngularJS framework to work. If you do not already have angular downloaded, please go ahead and do it from [here](https://angularjs.org/).
You will also need to download and link [angular-moment](https://cdnjs.cloudflare.com/ajax/libs/angular-moment/1.0.1/angular-moment.min.js) and [moment.js](https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js) with your project because the SDK internally uses moment.js.

## How to Use

The following section describes how to use the generated SDK in an existing/new project.

### 1. Configure Angular and Generated SDK
Perform the following steps to configure angular and the SDK:
+ Make a `scripts` folder inside the root folder of the project. If you already have a `scripts` folder, skip to the next step.
+ Move the `angular.min.js` file inside the scripts folder. 
+ Move the `ArionLib` folder inside the scripts folder.
+ If any of the Custom Types in your API have `Date`/`Datetime` type fields or any endpoint has `Date`/`Datetime` response, you will need to download angular-moment and moment.js. Move these 2 files into the `scripts` folder as well.

![folder-structure-image](https://apidocs.io/illustration/angularjs?step=folderStructure&workspaceFolder=Arion-Angular&projectName=ArionLib)

### 2. Open Project Folder
Open an IDE/Text Editor for JavaScript like Sublime Text. The basic workflow presented here is also applicable if you prefer using a different editor or IDE.  
Click on `File` and select `Open Folder`

Select the folder of your SDK and click on `Select Folder` to open it up in Sublime Text. The folder will become visible in the bar on the left.

![open-folder-image](https://apidocs.io/illustration/angularjs?step=openFolder&workspaceFolder=Arion-Angular)

### 3. Create an Angular Application
Since Angular JS is used for client-side web development, in order to use the generated library, you will have to develop an application first.
If you already have an angular application, [skip to Step 6](#6-include-sdk-references-in-html-file). Otherwise, follow these steps to create one:

+ In the IDE, click on `File` and choose `New File` to create a new file.
+ Add the following starting code in the file:
```js
var app = angular.module('myApp', []);
app.controller('testController', function($scope) 
{

});
```
+ Save it with the name `app.js` in the `scripts` folder.


### 4. Create HTML File
Skip to the next step if you are working with an existing project and already have an html file. Otherwise follow the steps to create one:
+ Inside the IDE, right click on the project folder name and select the `New File` option to create a new test file.
+ Save it with an appropriate name such as `index.html` in the root of your project folder.
`index.html` should look like this:
```html
<!DOCTYPE html>
<html>
<head>
	<title>Angular Project</title>
	<script></script>
</head>

<body>
</body>

</html>
```

![initial-html-code-image](https://apidocs.io/illustration/angularjs?step=initialCode&workspaceFolder=Arion-Angular)

### 5. Including links to Angular in HTML file
Your HTML file needs to have a link to `angular.min.js` file to use Angular-JS. Add the link using `script` tags inside the `head` section of `index.html` like:
```html
<script src="scripts/angular.min.js" ></script>
```
If any of the Custom Types that you have defined have `Date`/`Datetime` type fields or any endpoint has `Date`/`Datetime` response, you will also need to link to angular-moment and moment.js like:
```html
<script src="scripts/angular.min.js" ></script>
<script src="scripts/moment.min.js" ></script>
<script src="scripts/angular-moment.min.js" ></script>
```

### 6. Include SDK references in HTML file
Import the reference to the generated SDK files inside your html file like:
```html
<head>
    ...
    <!-- Helper files -->
    <script src="scripts/ArionLib/Module.js"></script>
    <script src="scripts/ArionLib/Configuration.js"></script>
    <script src="scripts/ArionLib/ModelFactory.js"></script>
    <script src="scripts/ArionLib/ObjectMapper.js"></script>
    <script src="scripts/ArionLib/APIHelper.js"></script>
    <script src="scripts/ArionLib/Http/Client/HttpContext.js"></script>
    <script src="scripts/ArionLib/Http/Client/HttpClient.js"></script>
    <script src="scripts/ArionLib/Http/Request/HttpRequest.js"></script>
    <script src="scripts/ArionLib/Http/Response/HttpResponse.js"></script>

    <!-- API Controllers -->
    <script src="scripts/ArionLib/Controllers/BaseController.js"></script>
    <script src="scripts/ArionLib/Controllers/ActorController.js"></script>
    <script src="scripts/ArionLib/Controllers/StepsController.js"></script>
    <script src="scripts/ArionLib/Controllers/AssetItemController.js"></script>
    <script src="scripts/ArionLib/Controllers/AssetController.js"></script>


    <!-- Models -->
    <script src="scripts/ArionLib/Models/BaseModel.js"></script>
    <script src="scripts/ArionLib/Models/ActorRequest.js"></script>
    <script src="scripts/ArionLib/Models/StepRequest.js"></script>
    <script src="scripts/ArionLib/Models/AssetItemRequest.js"></script>
    <script src="scripts/ArionLib/Models/AssetRequest.js"></script>

    ...
</head>
```
> The `Module.js` file should be imported before the other files. After `Module.js`, `Configuration.js` should be imported.
> The `ModelFactory.js` file is needed by `ObjectMapper.js` file. The `ObjectMapper` in turn, is needed by `BaseController.js`.

### 7. Including link to `app.js` in HTML file
Link your `app.js` file to your `index.html` file like:
```html
<head>
	...
	<script src="scripts/app.js"></script>
</head>
```
> The link to app.js needs to be included at the very end of the head tag, after the SDK references have been added

### 8. Initializing the Angular App
You need to initialize your app and the controller associated with your view inside your `index.html` file. Do so like:
+ Add ng-app directive to initialize your app inside the `body` tag.
```html
<body ng-app="myApp">
```
+ Add ng-controller directive to initialize your controller and bind it with your view (`index.html` file).
```html
...
<body ng-app="myApp">
	<div ng-controller="testController">
		...
	</div>
	...
</body>
...
```

### 9. Consuming the SDK 
In order to use the generated SDK's modules, controllers and factories, the project needs to be added as a dependency in your angular app's module. This will be done inside the `app.js` file.
Add the dependency like this:

```js
var app = angular.module('myApp', ['ArionLib']);
```
At this point, the SDK has been successfully included in your project. Further steps include using a service/factory from the generated SDK. To see working example of this, please head on [over here](#list-of-controllers) and choose any class to see its functions and example usage.  

### 10. Running The App
To run the app, simply open up the `index.html` file in a browser.

![app-running](https://apidocs.io/illustration/angularjs?step=appRunning)

## Initialization


The Angular Application can be initialized as following:
```JavaScript
var app = angular.module('myApp', [ArionLib]);
// now controllers/services can be created which import
// the factories provided by the sdk
```
### 




# Class Reference

## <a name="list_of_controllers"></a>List of Controllers

* [ActorController](#actor_controller)
* [StepsController](#steps_controller)
* [AssetItemController](#asset_item_controller)
* [AssetController](#asset_controller)

## <a name="actor_controller"></a>![Class: ](https://apidocs.io/img/class.png ".ActorController") ActorController

### Get singleton instance

The singleton instance of the ``` ActorController ``` class can be accessed via Dependency Injection.

```js
	app.controller("testController", function($scope, ActorController){
	});
```

### <a name="actor"></a>![Method: ](https://apidocs.io/img/method.png ".ActorController.actor") actor

> Add a new Actor to the blockchain


```javascript
function actor(body)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript


	app.controller("testController", function($scope, ActorController){
        var body = new ActorRequest({
  "actorID": "{{actor.actorID}}",
  "assetID": "{{actor.assetID}}",
  "actorType": "{{actor.actorType}}",
  "actorName": "{{actor.actorName}}",
  "aditionalInfoMap": "{{actor.aditionalInfoMap}}"
});


		var result = ActorController.actor(body);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="actor"></a>![Method: ](https://apidocs.io/img/method.png ".ActorController.actor") actor

> TODO: Add a method description


```javascript
function actor()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, ActorController){


		var result = ActorController.actor();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="actor_by_id"></a>![Method: ](https://apidocs.io/img/method.png ".ActorController.actorById") actorById

> TODO: Add a method description


```javascript
function actorById()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, ActorController){


		var result = ActorController.actorById();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="actor_by_id1"></a>![Method: ](https://apidocs.io/img/method.png ".ActorController.actorById1") actorById1

> TODO: Add a method description


```javascript
function actorById1()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, ActorController){


		var result = ActorController.actorById1();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="actor_by_id2"></a>![Method: ](https://apidocs.io/img/method.png ".ActorController.actorById2") actorById2

> TODO: Add a method description


```javascript
function actorById2()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, ActorController){


		var result = ActorController.actorById2();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



[Back to List of Controllers](#list_of_controllers)

## <a name="steps_controller"></a>![Class: ](https://apidocs.io/img/class.png ".StepsController") StepsController

### Get singleton instance

The singleton instance of the ``` StepsController ``` class can be accessed via Dependency Injection.

```js
	app.controller("testController", function($scope, StepsController){
	});
```

### <a name="step"></a>![Method: ](https://apidocs.io/img/method.png ".StepsController.step") step

> Add a new Actor to the blockchain


```javascript
function step(body)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript


	app.controller("testController", function($scope, StepsController){
        var body = new StepRequest({
  "stepID": "{{step.stepID}}",
  "assetID": "{{step.assetID}}",
  "stepName": "{{step.stepName}}",
  "stepOrder": "{{step.stepOrder}}",
  "actorType": "{{step.actorType}}",
  "aditionalInfoMap": "{{step.aditionalInfoMap}}"
});


		var result = StepsController.step(body);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="step"></a>![Method: ](https://apidocs.io/img/method.png ".StepsController.step") step

> TODO: Add a method description


```javascript
function step()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, StepsController){


		var result = StepsController.step();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="step_by_id"></a>![Method: ](https://apidocs.io/img/method.png ".StepsController.stepById") stepById

> TODO: Add a method description


```javascript
function stepById()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, StepsController){


		var result = StepsController.stepById();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="step_by_id1"></a>![Method: ](https://apidocs.io/img/method.png ".StepsController.stepById1") stepById1

> TODO: Add a method description


```javascript
function stepById1()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, StepsController){


		var result = StepsController.stepById1();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="step_by_id2"></a>![Method: ](https://apidocs.io/img/method.png ".StepsController.stepById2") stepById2

> TODO: Add a method description


```javascript
function stepById2()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, StepsController){


		var result = StepsController.stepById2();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



[Back to List of Controllers](#list_of_controllers)

## <a name="asset_item_controller"></a>![Class: ](https://apidocs.io/img/class.png ".AssetItemController") AssetItemController

### Get singleton instance

The singleton instance of the ``` AssetItemController ``` class can be accessed via Dependency Injection.

```js
	app.controller("testController", function($scope, AssetItemController){
	});
```

### <a name="asset_item"></a>![Method: ](https://apidocs.io/img/method.png ".AssetItemController.assetItem") assetItem

> Add a new Asset Item to the blockchain


```javascript
function assetItem(body)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetItemController){
        var body = new AssetItemRequest({
  "assetItemID": "{{assetItem.assetItemID}}",
  "assetID": "{{assetItem.assetID}}",
  "ownerID": "{{assetItem.ownerID}}",
  "stepID": "{{assetItem.stepID}}",
  "deliveryDate": "{{assetItem.deliveryDate}}",
  "orderPrice": "{{assetItem.orderPrice}}",
  "shippingPrice": "{{assetItem.shippingPrice}}",
  "status": "{{assetItem.status}}",
  "quantity": "{{assetItem.quantity}}",
  "aditionalInfoMap": "{{assetItem.aditionalInfoMap}}"
});


		var result = AssetItemController.assetItem(body);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="asset_item"></a>![Method: ](https://apidocs.io/img/method.png ".AssetItemController.assetItem") assetItem

> TODO: Add a method description


```javascript
function assetItem()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetItemController){


		var result = AssetItemController.assetItem();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="asset_item_by_id"></a>![Method: ](https://apidocs.io/img/method.png ".AssetItemController.assetItemById") assetItemById

> TODO: Add a method description


```javascript
function assetItemById()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetItemController){


		var result = AssetItemController.assetItemById();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="asset_item_by_id1"></a>![Method: ](https://apidocs.io/img/method.png ".AssetItemController.assetItemById1") assetItemById1

> TODO: Add a method description


```javascript
function assetItemById1()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetItemController){


		var result = AssetItemController.assetItemById1();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="asset_item_by_id2"></a>![Method: ](https://apidocs.io/img/method.png ".AssetItemController.assetItemById2") assetItemById2

> TODO: Add a method description


```javascript
function assetItemById2()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetItemController){


		var result = AssetItemController.assetItemById2();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="move_asset_item"></a>![Method: ](https://apidocs.io/img/method.png ".AssetItemController.moveAssetItem") moveAssetItem

> Moves an assetId from one step to another


```javascript
function moveAssetItem(body)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetItemController){
        var body = '{
    "assetItemID": {{assetItem.assetItemID}},
    "newAssetItemID": {{assetItem.newAssetItemID}},
    "stepID": {{assetItem.stepID}},
    "newOwnerID": {{assetItem.newOwnerID}},
    "assetID": {{assetItem.assetID}},
    "orderPrice": {{assetItem.orderPrice}},
    "shippingPrice": {{assetItem.shippingPrice}},
    "status": {{assetItem.status}},
    "quantity": {{assetItem.quantity}},
    "aditionalInfoMap": {{assetItem.aditionalInfoMap}}
}';


		var result = AssetItemController.moveAssetItem(body);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="track_asset_item_by_id"></a>![Method: ](https://apidocs.io/img/method.png ".AssetItemController.trackAssetItemById") trackAssetItemById

> Tracks an asset through the supply chain


```javascript
function trackAssetItemById()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetItemController){


		var result = AssetItemController.trackAssetItemById();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



[Back to List of Controllers](#list_of_controllers)

## <a name="asset_controller"></a>![Class: ](https://apidocs.io/img/class.png ".AssetController") AssetController

### Get singleton instance

The singleton instance of the ``` AssetController ``` class can be accessed via Dependency Injection.

```js
	app.controller("testController", function($scope, AssetController){
	});
```

### <a name="asset"></a>![Method: ](https://apidocs.io/img/method.png ".AssetController.asset") asset

> Add a new Actor to the blockchain


```javascript
function asset(body)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetController){
        var body = new AssetRequest({
  "assetID": "1",
  "assetName": "Gravel",
  "aditionalInfoMap": "{}"
});


		var result = AssetController.asset(body);
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="asset"></a>![Method: ](https://apidocs.io/img/method.png ".AssetController.asset") asset

> TODO: Add a method description


```javascript
function asset()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetController){


		var result = AssetController.asset();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="asset_by_id"></a>![Method: ](https://apidocs.io/img/method.png ".AssetController.assetById") assetById

> TODO: Add a method description


```javascript
function assetById()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetController){


		var result = AssetController.assetById();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="asset_by_id1"></a>![Method: ](https://apidocs.io/img/method.png ".AssetController.assetById1") assetById1

> TODO: Add a method description


```javascript
function assetById1()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetController){


		var result = AssetController.assetById1();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="asset_by_id2"></a>![Method: ](https://apidocs.io/img/method.png ".AssetController.assetById2") assetById2

> TODO: Add a method description


```javascript
function assetById2()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetController){


		var result = AssetController.assetById2();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="add_actor"></a>![Method: ](https://apidocs.io/img/method.png ".AssetController.addActor") addActor

> Add a new Actor to the blockchain


```javascript
function addActor()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetController){


		var result = AssetController.addActor();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="add_step"></a>![Method: ](https://apidocs.io/img/method.png ".AssetController.addStep") addStep

> Add a new Actor to the blockchain


```javascript
function addStep()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetController){


		var result = AssetController.addStep();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



### <a name="add_asset_item"></a>![Method: ](https://apidocs.io/img/method.png ".AssetController.addAssetItem") addAssetItem

> Add a new Actor to the blockchain


```javascript
function addAssetItem()
```

#### Example Usage

```javascript


	app.controller("testController", function($scope, AssetController){


		var result = AssetController.addAssetItem();
        //Function call returns a promise
        result.then(function(success){
			//success case
			//getting context of response
			console.log(success.getContext());
		},function(err){
			//failure case
		});

	});
```



[Back to List of Controllers](#list_of_controllers)



