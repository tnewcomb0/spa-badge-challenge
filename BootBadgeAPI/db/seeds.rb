require 'faker'

["Abe", "Bil", "Bri", "Dee", "Egg", "Jon", "Mia", "Nil", "Tal", "Tre"].each do |person|
  new_person = Person.create(name: person)
end
