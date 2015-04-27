module LineItemsHelper
  def highlight(condition, class_name = 'on')
    if condition
      " class=#{class_name}"
    else
      ""
    end
  end
end
