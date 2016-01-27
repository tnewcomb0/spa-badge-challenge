class Person < ActiveRecord::Base
  has_many :badges, -> { order 'points desc' }
end
