import { Page } from "./PageChrome";
import { PageCover, PageOverview, PageRating, PageOwnership, PageTrade } from "./ReportPages";

// Five fixed A4 pages mirroring the reference report layout. Each page owns
// its exact section placement so page breaks always land where they should.
export default function ReportDocument({ data }) {
  return (
    <div className="rpt-root">
      <Page><PageCover data={data} /></Page>
      <Page><PageOverview data={data} /></Page>
      <Page><PageRating data={data} /></Page>
      <Page><PageOwnership data={data} /></Page>
      <Page><PageTrade data={data} /></Page>
    </div>
  );
}
