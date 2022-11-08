<!-- Below you will find an example of a project object.
Below does not include all the properties of a project object. It only includes the properties
that are required to compute the budget.

The below intends to describe a bit of the business logic behind the project, so that you are able to better
understand the app.

The project object represents a program that we offer to the client.
The Program is usually a conference or an incentive trip
that the client is planning.

They usually stay for 2 or 3 days. On Arrival day, the agency meets them at the airport, they take them to the chosen hotel
by bus, or individual cars, and then they may do an offsite dinner on arrival day
On day 2, they may have a meeting in the morning, lunch in the hotel, an activity in the afternoon ....

The app offers them sample programs and diferent alternatives for each day.
 -->

```
{
	...
	nrPax: Number,
			    //nrPax represent the number of pax that will assist the Event. It will be useful to compute
			    //many budget lines


	hotels: [

			//hotels is an array of objects.
			//If it's empty, it means that we are not offering any hotel to this group. Maybe the client
			//has contracted the hotel themselves
			//Usually, there are several objects in the array, meaning that we are offering the client several
			//hotel options to choose from


		{
			DUInr: Number,
				//Number of Double Rooms for Single Use offered
			DUIprice: Number,
				//Daily Double Room for Single Use rate
			DoubleRoomNr: Number,
				//Number of Double Rooms (Rooms for 2 pax)
			DoubleRoomPrice: Number,
				//Daily Double Room rate
			breakfast: Number,
				//This amount is usually 0, since breakfast is usually included in the Hotel rate
				//If it's not 0, then the amount should be added to the price.
				//Breakfast is a price per person, so, if it's not included, it should be added twice to double room rates and once to DUIS (Double Rooms for Single Use)
			DailyTax: Number,
				//Daily tax is a tax that some cities charge to hotel stays. It's a tax per person per day
				//As an example, if the tax is EUR 2, and you have a group of 10 Single Rooms (DUI) and 20 Double Rooms for 3 days,
				//then the total tax line would be 3 days x 10 DUIS x 2EUR + 3days x 20 Double x 2pax per room x 2EUR
      },
	]

    schedule: [

			//Schedule is an array of objects
			//Each object represents a day of the program.
			//The length of the schedule array -1 represents the number of days in the program

		{
			transfer_in: [

				//the property transfer_in is an array of objects
				//The length of this array, represents the number of vehicles required to transport a group from the Airport to the required hotel
				//Example : a Group of 140pax coming on the same flight, would require 3 x 50 seater buses (transfer_in.length = 3)
				//this array will only be non empty for the first object in schedule (schedule[0] - Arrival Day)
				//For Arrival day (schedule[0]) being empty, means that we are not offering the client transportation from the Airport
				//If the array contains several objects, just focus on the first one - all the others are exactly the same
				//Just focus on the following fields

				{
					...
					transfer_in : Number
						//this will be the cost of a bus to go from Airport to Hotel
					meetGreet : Number
						//The cost for a guide/hostess, to go the airport, meet the group and direct them to their Bus
					assistance: Number
						//The cost for a guide/hostess, to go in the bus with the group

					//if any of the above are present, they need to be added as lines to the budget
					//if more than one of the above is present, there should be a line totalling the cost, ie transfer_in + meetGreet + assistance,
					//and a button to display a breakdown with the itemized cost

					vehicleCapacity: Number

					//vehicleCapacity will not be relevant to compute the line cost, but it will be useful to write the text of the budget line
					i.e "Transfer In - 50 Seater Bus
				}

			transfer_out: [

				//it's exactly the same concept as transfer in.
				//It represents the number of Buses required to transfer the group from the Hotel to the Airport on Departure day
				//transfer_out should be an empty array, except on departure day i.e schedule[schedule.length -1]

				{
					...
				}
			]

			morningEvents: [
				//the morning events represent activities or excursions that the group can go in the morning of any day
				//if, for example, the morningEvents array is non empty on the second day, that means that we are proposing the group to go on
				//a tour or activity on day y2
				//if the array has more than one option, it means that we are offering 2 alternatives for the same timeframe.
				//if the array has more than one option, they should show up in the budget as a select input
				//the properties relevant for the budget are as follows

				{
				    ...
					pricePerPerson : Boolean, default is true
						//for example, you can charge a Boat Trip activity as 1 x €2.000 (pricePerPerson false), or 40pax x 50Eur(pricePerPerson is true)

					...

					price: Number

						//that would be the price that the activity has. If pricePerPerson is false, then this price will be a total amount for the whole group.
						//if pricePerPerson is true (which is default), the event total line cost will be nrPax x price
						//if pricePerPerson is false, the event total line cost will be 1 x price

					...

					transfer: [
						//the transfer array represent any transfer needed to go to the tour or the activity
						//for example: For a boat trip, we would need 1 or more buses to take guests to the Harbour, wait for them, and
						//after the trip, take them back to the Hotel.
						//if the transfer array contains several objects, the length of the array will represent the number of buses required
						//all objects will be the same, so , just focus on the first object
						//the relevent properties for the transfer[0] object are as follows

						{
							...
							selectedService: String
							...
							vehicleCapacity: Number

							//selectedService is a string that represents one of the other keys in the object.
							//for instance the most frequent selected service for an excursion is "dispo_4h", which means
							//that the bus takes the group to the activity location, and stays in standby for a max of 4 hours, and then drives back
                            //if the selectedService is "dispo_4h", then the cost of the transfer will be the value of the key dispo_4h x transfer.length
							//if the selectedService is "dispo_4h",  and vehicleCapacity: 50,  then the text of the line should read "50-Seater Bus - Dispo 4h"

							...
							withAssistance: Boolean
							assistance: Number
							  //if assistance is a number different than 0, then the cost of the transfer will be the value of the key dispo_4h x transfer.length + assistance, and the line should breakdown into the cost of the transfer and the cost of the assistance


						}


					]

				}
			]

			morningMeetings: [
				//the morning meetings represent any meeting that the group can have in the morning of any day
				//if, for example, the morningMeetings array is non empty on the second day, that means that we are proposing the group to have
				//a meeting on day 2 in the morning
				//if the array has more than one option, it means that we are offering 2 alternatives for the same timeframe.
				//if the array has more than one option, they should show up in the budget as a select input
				//the properties relevant for the budget are as follows

				{
					...
					hotelName: String
						//the name of the hotel is only relevant for the text of the budget line and the select Input in the budget if there is more
						//than one option.

					...
					HDRate: Number
						//that is the rate that the hotel wants to charge to hire the meeting room. It is a total amount for the whole group for
						//a half day meeting

					HDDDR: 	Number
						//alternatively, some hotels charge an amount per person for a half day meeting. That amount typically includes the cost
						//of the meeting room, the cost of the coffee break, and the cost of the lunch.
						//if HDDDR is a number different than 0, then the cost of the meeting will be HDDDR x nrPax
						//if HDrate is a number different than 0, then HDDDR will be 0, and vice-versa

					coffeeBreakUnits: Number
						//it's self explanatory.
					coffeeBreakPrice: Number
						//it's self explanatory.
					workingLunchUnits: Number
						//it's self explanatory.
					workingLunchPrice: Number
						//it's self explanatory.
					hotelDinnerUnits: Number
						//it's self explanatory.
					hotelDinnerPrice: Number
						//it's self explanatory.
					aavvPackage: Number
						//The hotel can also offer costing for Audiovisuals in the meeting room. That is the price of the package (for instance, a sound system, a projector, a screen, a microphone, etc)
					   //The morning meeting budget line should show the total cost
					   //The morning meeting should have a breakdown of the cost, with only the lines that have a value different than 0

				}
			]

			lunch: [

				//the lunch array represent any lunch that the group can have in the afternoon of any day
				//if, for example, the lunch array is non empty on the second day, that means that we are proposing the group to have
				//a lunch on day 2
				//if the array has more than one option, it means that we are offering 2 alternatives for the same timeframe.
				//if the array has more than one option, they should show up in the budget as a select input
				//the properties relevant for the budget are as follows

				{
					...
					isVenue: Boolean

					...
					price: Number

						//if isVenue is false, then the lunch is at a normal restaurant.
						//if isVenue is false, the budget line cost will be nrPax x price

					venue_price: [

						//The difference between a restaurant and a venue is that a venue does normally not have a kitchen, but the food
						//is prepared by a caterer. Venues are for larger groups, and the pricing is more complicated.
						//It is more common to book venues for dinner, but we can also book them for lunch
						//venue_price is an array of objects, but it will always have only one object.

						{
							rental: Number
							//the rental is the dry-hire cost of the venue for the whole group

							cocktail_units: Number
							//venues usually offer a welcome drink, previous to the meal.

							cocktail_price: Number
							//the price of the cocktail
							//the cost of the cocktail will be cocktail_units x cocktail_price

							catering_units: Number
							//the number of people that the caterer will prepare food for
							catering_price: Number
							//the price of the catering
							//the cost of the catering will be catering_units x catering_price

							staff_units: Number
							//the caterer usually offers a special price for the staff
							staff_menu_price: Number
							//the price of the staff menu

							audiovisuals: Number
							//the price of the audiovisuals package to set a stage, or sound system, or anything related.
							//we set just one lump sum for the Audiovisuals package.

							cleaning: Number
							//the price of the cleaning service

							security: Number
							//the price of the security service

							entertainment: Number
							//the price of the entertainment service -singers, dancers, etc. It's just one lump sum

							//the total cost of the lunch will be the sum of the above values if present
							//total cost = rental + cocktail_units x cocktail_price + catering_units x catering_price + staff_units x staff_menu_price + audiovisuals + cleaning + security + entertainment

						}
					]

					transfer : exactly the same case as transfer in the morning Event
				}
				]

			fullDayMeetings: [

				//same as morningMeetings or afternoonMeetings, but for full day meetings
				...
				HDRate: Number,
				   //will always be 0 in full day meetings
				FDRate: Number,
				   //that is the rate that the hotel wants to charge to hire the meeting room for a full day meeting
				HDDDR: Number,
					//will always be 0 in full day meetings
				FDDDR: Number,
					//alternatively, some hotels charge an amount per person for a full day meeting. That amount typically includes the cost
					//of the meeting room, the cost of the coffee break and the cost of the lunch.
					//if FDDDR is a number different than 0, then the cost of the meeting will be FDDDR x nrPax
					//if FDrate is a number different than 0, then FDDDR will be 0, and vice-versa
			]
		}
	]

}

```

### Other fields in schedule

1. afternoonEvents work exactly the same way as morningEvents
2. afternoonMeeting work exactly the same way as morningMeeting
3. dinner work exactly the same way as lunch
4. transfer_out work exactly the same way as transfer_in, with the notes described in line 92
