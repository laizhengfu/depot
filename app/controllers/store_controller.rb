class StoreController < ApplicationController
  def index
    @products = Product.order('id DESC').paginate :page => params[:page], :per_page => 5
    @view_count = view_count
    @cart = current_cart
  end
end
