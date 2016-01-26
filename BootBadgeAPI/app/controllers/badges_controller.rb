class BadgesController < ApplicationController
  def index
    person = find_person(params[:person])
    badges = person.badges
    render :json => badges
  end

  def create
  end

  def update
  end

  private
  def find_person(location_hash)
    return Person.find_by_name(location_hash.slice(1..-1).capitalize)
  end

end
