-- CreateIndex
CREATE INDEX "DoctorVisit_clinicId_idx" ON "public"."DoctorVisit"("clinicId");

-- CreateIndex
CREATE INDEX "DoctorVisit_startTime_idx" ON "public"."DoctorVisit"("startTime");

-- CreateIndex
CREATE INDEX "DoctorVisit_endTime_idx" ON "public"."DoctorVisit"("endTime");
