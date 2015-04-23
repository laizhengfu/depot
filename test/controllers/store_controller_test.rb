require 'test_helper'

class StoreControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_select '#main', 1
    assert_select '#main .entry', 2
    assert_select 'h3', 'MyString title my title'
    assert_select '.price', /\$[,\d]+\.\d\d/
  end

end
