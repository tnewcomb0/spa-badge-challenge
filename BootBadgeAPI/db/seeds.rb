require 'faker'

["Anne", "Derek", "Hunter", "Jen", "Julian", "Sarah", "Shambhavi", "Walker"].each do |person|
  new_person = Person.create(name: person)
  5.times do
    Badge.create(title: Faker::Company.catch_phrase, points: rand(1..10), person_id: new_person.id)
  end
end
