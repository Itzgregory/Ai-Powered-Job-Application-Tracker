import IntroSection from "./../hero/componet/intro";


export const QuickActionsSection = ({ intros }: { intros: any[] }) => (
    <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
      <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[--primary-color] mb-4">
        Quick Actions
      </h2>
      <IntroSection intros={intros} />
    </section>
  );
  
  export const ResourcesSection = ({ intros }: { intros: any[] }) => (
    <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
      <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[--primary-color] mb-4">
        Resources For You
      </h2>
      <IntroSection intros={intros} />
    </section>
  );