class LineItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :cart

  def total_price
    product.price * quantity
  end

  def update_quantity(num)
    self.update(quantity: quantity+num)
  end
end
