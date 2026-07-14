import { CorporateLayout } from "./CorporateChrome";
import {
  CoverSection,
  IdentificationSection,
  RatingSection,
  ExecutiveSummarySection,
  HistorySection,
  DirectorsSection,
  OwnershipSection,
  ChangeLogSection,
  TradeSection,
  EconomicOverviewSection,
  RatingExplanationsSection,
} from "./CorporateSections";

// Corporate report: a flowing document whose sections paginate naturally,
// with the header/footer repeated on every page by the layout wrapper.
export default function CorporateDocument({ data }) {
  return (
    <CorporateLayout>
      <CoverSection data={data} />
      <IdentificationSection data={data} />
      <RatingSection data={data} />
      <ExecutiveSummarySection data={data} />
      <HistorySection data={data} />
      <DirectorsSection data={data} />
      <OwnershipSection data={data} title="ULTIMATE BENEFICIARY OWNERSHIP" />
      <OwnershipSection data={data} title="SHAREHOLDERS" />
      <ChangeLogSection data={data} />
      <TradeSection data={data} />
      <EconomicOverviewSection data={data} />
      <RatingExplanationsSection />
    </CorporateLayout>
  );
}
