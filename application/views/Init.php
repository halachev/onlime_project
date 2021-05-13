<!DOCTYPE html>
<html ng-app="demo-project">
<head>
	<title>test project</title>

	<!-- Fonts -->
	<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	
	<!-- Angular JS -->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>  
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular-route.min.js"></script>

	<!-- MY App -->
	<script src="app/app.js"></script>
</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">test project</a>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li><a href="#/">Home</a></li>
					<li><a href="#/items">Items for sale <span style="color: red;">({{count}})<span></a></li>
				</ul>
			</div>
			<div class="col-sm-2 col-md-2 pull-left">
				
				<div class="input-group">
					<input type="text" class="form-control" ng-model="itemName" placeholder="Search" name="srch-term" id="srch-term">
					<div class="input-group-btn">
						<button class="btn btn-default" ng-click="search()"><i class="glyphicon glyphicon-search"></i></button>
					</div>
				</div>
				
			</div>
	</nav>

	<div class="container"><ng-view></ng-view></div>

</body>
</html>
