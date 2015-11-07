describe('FormController', function(){
  var formController;
  beforeEach(module('shuffling'));
  beforeEach(inject(function($controller){
    formController = $controller('FormController');
  }));
  it('should ')
});

describe('TabController', function(){
  var tabController;
  beforeEach(module('shuffling'));
  beforeEach(inject(function($controller){
    tabController = $controller('TabController');
  }));
  it('should initialize to 1', function(){
    expect(tabController.tab).toBe(1);
  });
});
