angular.module('2DMaker', []).
	controller('plotCtrl', ['$scope', function($scope){
		var init_w = 30, init_h = 30;
		$scope.table = [];
		$scope.bracket = "[";
		$scope.separator = ',';
		$scope.addValue = 1;
		$scope.overW = 0;
		$scope.overH = 0;
		$scope.inputW = init_w;
		$scope.inputH = init_h;
		var brackets = {
			'[' : ']',
			'{' : '}',
			'c(': ')',
			'Array(': ')',
			'List(' : ')',
			'Seq(' : ')',
			'(' : ')'
		};
		$scope.plot = function(i, j){
			console.log(i, j);
			$scope.table[i][j].content = $scope.table[i][j].content == 1? 0: 1;
		};

		function makeArray(size){
			var array = [];
			for(var i = 0; i < size; i++){
				array.push({content: 0});
			}
			return array;
		}

		$scope.addTop = function(){
			if($scope.addValue > 0){
				for(var i = 0; i < $scope.addValue; i++){
					$scope.table.unshift(makeArray($scope.table[0].length));
				}
			} else {
				for(var i = 0; i < -$scope.addValue; i++){
					$scope.table.shift();
				}
			}
		};

		$scope.highlight = function(h, w){
			$scope.overH = h;
			$scope.overW = w;
			// for(var i = 0; i < $scope.table.length; i++){
			// 	for(var j = 0; j < $scope.table[0].length; j++){
			// 		$scope.table[i][j].highlight = false;
			// 	}
			// }
			// for(var i = 0; i <= w; i++){
			// 	$scope.table[h][i].highlight = true;
			// }
			// for(var i = 0; i <= h; i++){
			// 	$scope.table[i][w].highlight = true;
			// }
		};

		$scope.addBottom = function(){
			if($scope.addValue > 0){
				for(var i = 0; i < $scope.addValue; i++){
					$scope.table.push(makeArray($scope.table[0].length));
				}
			} else {
				for(var i = 0; i < -$scope.addValue; i++){
					$scope.table.pop();
				}
			}
		};

		$scope.addLeft = function(){
			if($scope.addValue > 0){
				for(var i = 0; i < $scope.table.length; i++){
					for(var j = 0; j < $scope.addValue; j++){
						$scope.table[i].unshift({content: 0});
					}
				}
			} else {
				for(var i = 0; i < $scope.table.length; i++){
					for(var j = 0; j < -$scope.addValue; j++){
						$scope.table[i].shift();
					}
				}
			}

		};

		$scope.addRight = function(){
			if($scope.addValue > 0){
				for(var i = 0; i < $scope.table.length; i++){
					for(var j = 0; j < $scope.addValue; j++){
						$scope.table[i].push({content: 0});
					}
				}
			} else {
				for(var i = 0; i < $scope.table.length; i++){
					for(var j = 0; j < -$scope.addValue; j++){
						$scope.table[i].pop();
					}
				}
			}

		};

		$scope.clear = function(){
			for(var i = 0; i < $scope.table.length; i++){
				$scope.table[i] = makeArray($scope.table[0].length);
			}
		};

		$scope.arrayString = function(){
			return $scope.bracket + "\n" +$scope.table.map(function(row){
				return "\t" + $scope.bracket + row.map(function(v){
					return v.content;
				}).join($scope.separator) + brackets[$scope.bracket];
			}).join($scope.separator+"\n") + "\n" + brackets[$scope.bracket];
		};

		$scope.resetSize = function(){
			var bkAddValue = $scope.addValue;
			$scope.addValue = $scope.inputW - $scope.table[0].length;
			$scope.addRight();
			$scope.addValue = $scope.inputH - $scope.table.length;
			$scope.addBottom();
			$scope.addValue = bkAddValue;
		};


		for(var i = 0; i < init_h; i++){
			$scope.table.push([]);
			for(var j = 0; j < init_w; j++){
				$scope.table[i].push({content: 0});
			}
		}
	}]);
