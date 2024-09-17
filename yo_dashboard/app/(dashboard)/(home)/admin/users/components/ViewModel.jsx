"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
const ViewModel = () => {
  return (
    <div className="flex flex-wrap  gap-x-5 gap-y-4 ">
     
    
    
   
    
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open 2xl Modal</Button>
        </DialogTrigger>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-medium text-default-700 ">
              What is the world's number one tourist destination?
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500  space-y-4">
            <p>
              <span className="text-primary font-medium">France</span> is the
              most visited country in the world with 117,109,000 international
              tourists, thanks to its rich history and iconic landmarks.
            </p>
            <p>
              France's magnetic City of Light is a perennial tourist
              destination, drawing visitors with its iconic attractions, like
              the Eiffel Tower and the Louvre, and its unmistakable je ne sais
              quoi. Quaint cafes, trendy shopping districts and Haussmann
              architecture give Paris its timeless beauty. But the city's best
              asset is that you're likely to discover something new with each
              trip or season (read: Paris is always a good idea). To best
              explore France's ever-changing capital, get lost wandering the
              charming cobblestone streets, learn its secrets on a walking
              tour head to dynamic art exhibits like the Atelier des Lumières
              or gourmandize at the latest restaurants and pastry shops
            </p>
          </div>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button type="submit" variant="outline">
                Disagree
              </Button>
            </DialogClose>
            <Button type="submit">Agree</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
     
   
  
    </div>
  );
};

export default ViewModel;