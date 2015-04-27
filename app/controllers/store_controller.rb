class StoreController < ApplicationController
  def index
    @products = Product.all
    @view_count = view_count
    @cart = current_cart
  end
end
