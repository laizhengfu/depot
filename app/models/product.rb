class Product < ActiveRecord::Base
  default_scope :order => 'title'
  validates :title, :description, :image_url, :presence => {:message => " not be blank"}
  validates :price, :numericality => {:greater_than_or_equal_to => 0.01}
  validates :title, :uniqueness => true
  validates :image_url, :format => {
                          :with => %r{\.(gif|jpg|png)$}i,
                          :multiline => true,
                          :message => 'must be a images'
                      }
  validates_length_of :title, :minimum => 10, :message => "title length must greater 10"
end
