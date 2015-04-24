class StoreController < ApplicationController
  def index
    @products = Product.all
    @view_count = view_count
  end
end
