import { Metadata } from "next";
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import InstructorAnnouncementArea from "@/components/dashboard/instructor/instructor-announcement-area";
import AnnouncementModal from "@/components/modal/announcement-modal";
import AnnounceDetailsModal from "@/components/modal/announce-details-modal";

export const metadata: Metadata = {
    title: "Instructor Announcements - Acadia",
}

export default function InstructorAnnouncementsPage() {
    return (
        <main className="tp-dashboard-body-bg">

            {/* dashboard banner area start */}
            <DashboardBanner />
            {/* dashboard banner area end */}

            {/* dashboard content area start */}
            <DashboardContentWrapper>
                <InstructorAnnouncementArea />
            </DashboardContentWrapper>
            {/* dashboard content area end */}

            {/* announcement modal */}
            <AnnouncementModal />
            <AnnounceDetailsModal />
            {/* announcement modal */}

        </main>
    )
}
