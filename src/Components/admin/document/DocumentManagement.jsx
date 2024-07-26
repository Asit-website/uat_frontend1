import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import bxUser from "../../images/bx-user-pin.png";
import docSub from "../../images/docSubfir.png";
import JoditEditor from "jodit-react";

import "./document.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import toast from "react-hot-toast";

const item = [
  {
    title: "Full-time Employees",
  },
  {
    title: "Intern Employees",
  },
  {
    title: "Freelancer Employees",
  },
];

const item2 = [
  {
    title: "Offer Letter",
  },
  {
    title: "Relieving Letter",
  },
 
]

const data = `<p class="MsoNormal" align="left" style="text-indent: -1px; font-family: Inter, sans-serif; color: black; margin: 0in 0in 0in 1px; text-align: left; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-family: Arial, Helvetica, sans-serif;">Private
        &amp; Confidential </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; background: yellow; font-family: Arial, Helvetica, sans-serif;">06 June
        2024</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Dear <span style="background: yellow;">Mohit Sharma</span>,</span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; color: windowtext; font-family: Arial, Helvetica, sans-serif;">I
        am pleased to extend this offer letter for the position of <strong><span style="background: yellow;">Business
                Development Manager</span></strong><span style="background: yellow;"> (BDM)</span> on <span style="background: yellow;">a
            part-time</span> basis at <strong>KUSHEL DIGI
            SOLUTIONS</strong>. We are excited about the prospect of you joining our team and
        contributing your expertise to our organization.</span></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Position<span style="background: yellow;">:</span></span></strong><span style="color: windowtext; background: yellow;"> Business Development Manager (Part-Time)</span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; background: yellow; font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Joining
            Date:<span>&nbsp; </span></span></strong><span style="color: windowtext; background: yellow;">10 June
        2024</span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; background: yellow; font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Location:
        </span></strong><span style="color: windowtext;">Sector- 63, Noida</span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Working
            Hours<span style="background: yellow;">:</span></span></strong><span style="color: windowtext; background: yellow;"> <span>&nbsp;</span>5:00 Hours</span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; background: yellow; font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Working
            Days</span></strong><span style="color: windowtext;">: Monday to Saturday</span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;">Responsibilities:</span></strong></p>

<ol start="1" type="1" style="margin-bottom: 0in;">
    <li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: yellow; font-family: Arial, Helvetica, sans-serif;">Identify
            and pursue new business opportunities to generate leads and increase
            revenue.</span></li>
    <li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: yellow; font-family: Arial, Helvetica, sans-serif;">Develop
            and maintain relationships with clients and key stakeholders.</span></li>
    <li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: yellow; font-family: Arial, Helvetica, sans-serif;">Collaborate
            with the sales and marketing teams to develop strategies for business
            growth.</span></li>
    <li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: yellow; font-family: Arial, Helvetica, sans-serif;">Analyze
            market trends and competitor activities to identify potential areas for
            expansion.</span></li>
    <li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: yellow; font-family: Arial, Helvetica, sans-serif;">Prepare
            and deliver presentations to prospective clients.</span></li>
    <li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: yellow; font-family: Arial, Helvetica, sans-serif;">Negotiate
            contracts and agreements with clients.</span></li><li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="background: yellow; font-family: Arial, Helvetica, sans-serif;"><br></span></li>
</ol>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Compensation</span></strong><span style="color: windowtext;">: Your compensation for this
        position will be <strong><span style="background: yellow;">00,000</span></strong><span style="background: yellow;">/- PM</span> + incentives based on the target's
        achievements policies.</span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">Benefits</span></strong><span style="color: windowtext;">: As a part-time employee,
        you will be eligible for the following benefits:</span></p>

<ol start="1" type="1" style="margin-bottom: 0in;">
    <li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">Flexible work schedule.</span></li>
    <li class="MsoNormal" style="margin: 0in 0in 0px 0.5in; font-family: Inter, sans-serif; color: windowtext; text-align: left; text-indent: -0.25in; line-height: normal; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">Opportunities for professional
            development and growth.</span></li>
</ol>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext;">&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext; font-size: 19px; font-family: Arial, Helvetica, sans-serif;">Terms of Employment:</span></strong></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><strong><span style="color: windowtext; font-size: 19px; font-family: Arial, Helvetica, sans-serif;"><br></span></strong></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;">This offer of employment is
        contingent upon your acceptance of the terms outlined in this letter and the
        successful completion of any background checks or screenings required by <strong>KUSHEL DIGI SOLUTIONS</strong>.</span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;">Please indicate your
        acceptance of this offer by signing and returning a copy of this letter by <strong><span style="background: yellow;">SATURADY</span></strong></span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext;"><strong><span style="background: yellow; font-family: Arial, Helvetica, sans-serif;"> [08/06/2024]</span></strong></span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">Theabovementioned
        offershallbe valid ifyoujoin uson orbefore<strong><span style="background: yellow;">Monday,10<sup>th</sup> ofJuneat10am</span></strong></span></p>

<p class="MsoNormal" style="text-align: justify; font-family: Arial, Helvetica, sans-serif; color: black; margin: 10px 14px 0in 0in; text-indent: 0in; line-height: 115%; font-size: 16px;"><span style="line-height: 115%; font-size: 15px;">Your annual gross emoluments will be </span><strong><span style="line-height: 115%; font-family: Arial, sans-serif; background: yellow; font-size: 15px;">Rs. 00, 00,000/- (Thousand only)</span></strong><span style="line-height: 115%; font-size: 15px;">includes Basic, HRA, Conveyance<span style="letter-spacing: 0px;">Allowances,</span><span style="letter-spacing: 0px;">Medical,</span>CommunicationandPersonalAllowances.ThedetailsofthesalaryareintheattachedSalarybreakup</span><strong><span style="line-height: 115%; font-family: Arial, sans-serif; font-size: 15px;">Annexure–A</span></strong><span style="line-height: 115%; font-size: 15px;">.</span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;">We are excited about the
        opportunity to work with you and believe that your skills and experience will make
        a significant contribution to our team. If you have any questions or require
        further clarification, please do not hesitate to contact me.</span></p><p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Inter, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext; font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">To confirm your acceptance to this
        agreement, please initial all the pages and put your signature on the
        declaration at the page of this agreement and return to us the duplicate copy
        of the entire agreement duly initialed and signed. We look forward to a long
        and mutually beneficial relationship. </span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px -31px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px -31px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="color: windowtext;"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Yours faithfully, </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" align="left" style="text-indent: -1px; font-family: Inter, sans-serif; color: black; margin: 0in 0in 0in 1px; text-align: left; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; background: yellow; font-family: Arial, Helvetica, sans-serif;">Priya
            Singh</span></strong></p>

<p class="MsoNormal" align="left" style="text-indent: -1px; font-family: Inter, sans-serif; color: black; margin: 0in 0in 0in 1px; text-align: left; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; background: yellow; font-family: Arial, Helvetica, sans-serif;">HR
            Manager</span></strong></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<h1 align="left" style="text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; margin: 0in 0in 0.15in 1px; text-align: left; font-size: 24px;"><span style="line-height: 107%; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">For and behalf of </span></h1>

<p class="MsoNormal" align="left" style="text-indent: -1px; font-family: Inter, sans-serif; color: black; margin: 0in 0in 11px 1px; text-align: left; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-family: Arial, Helvetica, sans-serif;">Kushel Digi Solutions.</span></strong></p>

<p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;">
    <v:shapetype id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f" style="font-family: Arial, Helvetica, sans-serif;">
        <v:stroke joinstyle="miter">
        <v:formulas>
            <v:f eqn="if lineDrawn pixelLineWidth 0">
            <v:f eqn="sum @0 1 0">
            <v:f eqn="sum 0 0 @1">
            <v:f eqn="prod @2 1 2">
            <v:f eqn="prod @3 21600 pixelWidth">
            <v:f eqn="prod @3 21600 pixelHeight">
            <v:f eqn="sum @0 0 1">
            <v:f eqn="prod @6 1 2">
            <v:f eqn="prod @7 21600 pixelWidth">
            <v:f eqn="sum @8 21600 0">
            <v:f eqn="prod @7 21600 pixelHeight">
            <v:f eqn="sum @10 21600 0">
        </v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:f></v:formulas>
        <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect">
        <o:lock v:ext="edit" aspectratio="t">
    </o:lock></v:path></v:stroke></v:shapetype>
    <v:shape id="Picture_x0020_201" o:spid="_x0000_s1027" type="#_x0000_t75" style="position:absolute;left:0;text-align:left;margin-left:4pt;margin-top:.15pt;
 width:136pt;height:67.5pt;z-index:251662336;visibility:visible;
 mso-wrap-style:square;mso-wrap-distance-left:9pt;mso-wrap-distance-top:0;
 mso-wrap-distance-right:9pt;mso-wrap-distance-bottom:0;
 mso-position-horizontal:absolute;mso-position-horizontal-relative:text;
 mso-position-vertical:absolute;mso-position-vertical-relative:text">
        <v:imagedata src="file:///C:/Users/91741/AppData/Local/Packages/oice_16_974fa576_32c1d314_30c6/AC/Temp/msohtmlclip1/01/clip_image001.png" o:title="" style="font-family: Arial, Helvetica, sans-serif;">
        <w:wrap type="square">
    </w:wrap></v:imagedata></v:shape>
    <!--[endif]----><img width="182" height="90" src="file:///C:/Users/91741/AppData/Local/Packages/oice_16_974fa576_32c1d314_30c6/AC/Temp/msohtmlclip1/01/clip_image002.gif" align="left" hspace="12" v:shapes="Picture_x0020_201"><strong><span><span>&nbsp;</span></span></strong></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span>&nbsp;</span><br></p>

<h1 style="line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 10px 0px 0in; text-align: justify; text-indent: 0in; font-size: 24px;"><span style="line-height: 107%; font-size: 19px;">&nbsp;</span><br></h1>

<p class="MsoNormal" style="margin: 0in 0in 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<h1 style="text-align: center; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; margin: 0in 10px 0px 0in; text-indent: 0in; font-size: 24px;"><span style="line-height: 107%; font-size: 19px; font-family: Arial, Helvetica, sans-serif;">Appendix A</span></h1>

<p class="MsoNormal" align="center" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 628px 7px 0in; text-align: left; text-indent: 0in; line-height: 98%; font-size: 16px;"><strong><span style="line-height: 98%;"><span>&nbsp;
</span></span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;">Name:
</span></strong><span style="line-height: 107%; background: yellow;">Mohit Sharma</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;">Designation:
</span></strong><span style="line-height: 107%; color: windowtext; background: yellow;">Business Development Manager</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;">Location:
</span></strong><span style="line-height: 107%;">Sector 63, Noida</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 628px 7px 0in; text-align: left; text-indent: 0in; line-height: 100%; font-size: 16px;"><span style="line-height: 100%;"><span>&nbsp; </span></span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 628px 7px 0in; text-align: left; text-indent: 0in; line-height: 100%; font-size: 16px;"><span>&nbsp;</span><br></p>

<p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 0in 1px; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 19px; font-family: Arial, Helvetica, sans-serif;">Compensation
Details</span></strong></p>

<p class="MsoNormal" style="text-align: justify; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 19px;">&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; text-indent: 0in; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">All
the above amounts are based on a full year of service. The amount payable to
you will be determined on pro-rata based on the number of days that you serve
with the Company during the applicable financial year. The annual payable to
you shall be liable to tax deduction at source as per the applicable law for
the time being in force.</span></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span>&nbsp;</span><br></p>

<table class="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" align="left" width="701" style="margin-left: 9px; margin-right: 9px;">
 <tbody><tr style="height: 22px;">
  <td width="701" colspan="2" valign="top" style="width: 7.3in; padding: 0in; height: 22px;">
  <p class="TableParagraph" align="center" style="font-family: Arial, Helvetica, sans-serif; margin: 3px 335px 0px 0in; text-align: center; line-height: 87%; font-size: 15px;"><strong><span style="line-height: 87%; font-family: Inter, sans-serif; font-size: 13px;"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span><span>&nbsp;</span>Annexure–A</strong>.</p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">PerMonthFixed</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">,000.00</span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p class="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Arial, Helvetica, sans-serif; color: black; font-size: 13px;">SalaryBreak -upComponents</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Arial, Helvetica, sans-serif; color: black; font-size: 13px;">Monthly
  (INR)</span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">Basic+DA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">HRA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">ConveyanceAllowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">000.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">Medical
  Allowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">EducationAllowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 20px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 20px;">
  <p class="TableParagraph" style="margin: 0in 0in 0in 10px; font-family: Arial, sans-serif; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">LTA</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 20px;">
  <p class="TableParagraph" align="right" style="margin: 0in 2px 0in 0in; font-family: Arial, sans-serif; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="font-family: Arial, sans-serif; margin: 2px 0in 0px 10px; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">Communication</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 2px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">PersonalAllowance</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; padding: 0in; height: 21px;">
  <p class="TableParagraph" style="font-family: Arial, sans-serif; margin: 1px 0in 0px 10px; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">Bonus</span></p>
  </td>
  <td width="362" valign="top" style="width: 361px; padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 1px 2px 0px 0in; text-align: right; font-size: 15px;"><span style="font-family: Arial, Helvetica, sans-serif; background: yellow; font-size: 13px;">0.00</span></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p class="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Arial, Helvetica, sans-serif; color: black; font-size: 13px;">Net TakeHome(PerMonth)</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Arial, Helvetica, sans-serif; color: black; background: yellow; font-size: 13px;">0000.00</span></strong></p>
  </td>
 </tr>
 <tr style="height: 21px;">
  <td width="338" valign="top" style="width: 337px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p class="TableParagraph" style="font-family: Arial, sans-serif; margin: 3px 0in 0px 10px; font-size: 15px;"><strong><span style="font-family: Arial, Helvetica, sans-serif; color: black; font-size: 13px;">TOTALCOSTTOTHECOMPANY(PerAnnum)</span></strong></p>
  </td>
  <td width="362" valign="top" style="width: 361px; background: rgb(217, 217, 217); padding: 0in; height: 21px;">
  <p class="TableParagraph" align="right" style="font-family: Arial, sans-serif; margin: 3px 2px 0px 0in; text-align: right; font-size: 15px;"><strong><span style="font-family: Arial, Helvetica, sans-serif; color: black; background: yellow; font-size: 13px;">0000.00</span></strong></p>
  </td>
 </tr>
</tbody></table>

<p class="MsoBodyText" style="font-family: Inter, sans-serif; margin: 0px 70px 0px 0in; line-height: 103%; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">Pleasenotethatirrespectiveofwhetheryoujoin<strong>KUSHEL
DIGI SOLUTIONS</strong>ornot,youneedtokeepallthedetailscontainedinthisletterconfidential.</span></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<p class="MsoBodyText" style="margin: 0in; font-family: Inter, sans-serif; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">Welookforwardto yourjoiningand alongassociation.</span></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<h1 style="text-align: center; line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; margin: 0in 0in 8px; text-indent: 0in; font-size: 24px;"><span style="font-family: Arial, Helvetica, sans-serif;">Appendix B</span></h1>

<p class="MsoNormal" align="center" style="font-family: Inter, sans-serif; color: black; margin: 0in 0in 0in 29px; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 19px; font-family: Arial, Helvetica, sans-serif;">General Terms &amp; Conditions </span></strong></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">1.</span><span style="line-height: 107%;">Background Verification </span></h2>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 6px; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Your employment in the Company is
subject to satisfactory verification of your certificates, testimonials and
personal particulars/ credentials. The Company reserves the right to get a
background check (including criminal history record search, education and
employment; and personal details verification) conducted on you through
nominated third party agencies. In the event that such verification or
background check reveals any discrepancy in the statement(s) made in your
application or in the bio-data with the Company or in the declarations made by
you in this agreement, your services are liable to be terminated forthwith
without any notice or compensation.</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">2.</span><span style="line-height: 107%;">Date of Birth </span></h2>

<p class="MsoNormal" style="margin: 0in 0in 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 0in 2px 0in 0in; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-family: Arial, Helvetica, sans-serif;"><span>&nbsp; </span>The date of birth declared by you is <span style="background: yellow;">20/12/1992</span>. You will be
bound by such a declared </span></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;"><span>&nbsp;
</span>Date of birth in all service matters with the Company, including your
retirement age. </span></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">3.</span><span style="line-height: 107%;">Leave </span></h2>

<p class="MsoNormal" style="margin: 0in 0in 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; font-family: Inter, sans-serif; color: black; margin: 0in 0in 2px 6px; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">You will be eligible for 15 days’ annual leave per financial year
(in addition to statutory holidays).<span>&nbsp;&nbsp;
</span>You will not be entitled to receive payment in lieu of any unused leave.</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<h2 style="margin: 0in; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; text-indent: 0in; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span>4.</span><span style="line-height: 107%;">Confidentiality
</span></h2>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Maintaining confidentiality is a
condition to your employment. During your employment, you will not store,
possess, use or disclose confidential/ personal/ sensitive information or data
(including those from any of your previous employment(s) with other organizations)
in an unauthorized manner. You shall not bring any such information or data
into the Company. You will not, either during your employment with the Company
or after termination of such employment, divulge to anyone any information,
secret, accounts or dealings relating to the Company’s business, its affairs or
its client, service providers, sub-contractor or vendors, other than the
Directors of the Company or their authorized representatives. </span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">On discontinuation of your employment, you
will return to the Company, all papers and documents and all other property
pertaining to the Company or affairs of the Company or its client or any of its
associates or branches, which may be in your possession, and will not retain
any copy or extract there from. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">You agree to sign engagement specific
non-disclosure/ confidentiality agreements, if so, required by certain clients
of the Company. In case of any breach of confidentiality caused by you, either
during or after the termination of your employment with us, you will be
personally liable to our clients or third parties. You also agree to keep the
company and its directors indemnified for any loss which may be caused by your
failure to comply with confidentiality agreements.</span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 54px; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-family: Arial, Helvetica, sans-serif;">5.<span>&nbsp;&nbsp; </span>People Handbook- Policies &amp; Procedure: </span></strong></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">You acknowledge that the Company has or may
from time to time adopt a people handbook, restrictions, policies and
procedures with respect to the conduct of its business and the financial and
investment affairs of its officers, directors and employees, and you agree to
be bound by and to adhere to all such handbooks, restrictions, policies and
procedures. Without prejudice to the above, you agree that you will during the
course of your employment abide by all existing and future India laws
applicable to the performance of your duties, all applicable rules and
regulations set forth by regulatory agencies, exchanges and self-practices. You
further agree to submit to such supervision as may be necessary to ensure
compliance therewith. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: -25px; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>6.<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><strong><span style="line-height: 107%;">Indemnity: </span></strong></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">You hereby agree to indemnify the Company, to
the fullest extent permitted by law and to save and hold harmless the Company,
from and in respect of all reasonable fees, costs, loss, damages and expenses,
including legal fee paid in connection with or resulting from </span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">any claim, action, or demand against the
Company, that arises out of or in any way relates to any action or omission on
your part during the course of your employment with the</span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Company, where you were acting negligently or
unlawfully or in breach of the terms of your employment or in an unreasonable
manner. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0in 31px; text-align: left; text-indent: -25px; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>7.<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></strong><strong><span style="line-height: 107%;">Intellectual Property: </span></strong></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">The nature of work to be assigned to you might
be such that the clients may retain exclusive ownership rights on the resulting
work products on unconditional basis. Further,</span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">The Company may need to provide a client with
material without acknowledging each individual who worked on it. </span></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><strong><span style="line-height: 104%;">By
signing this agreement, you</span></strong><span style="line-height: 104%;">: </span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoListParagraph" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 17px; text-indent: -0.25in; font-size: 16px;"><span style="line-height: 104%; font-family: Symbol;"><span>·<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Acknowledge and agree to the condition
that all existing and future intellectual property rights in any materials,
information and technology of any nature created by you either singly or
jointly with other persons, are the exclusive property of the Company with
unfettered rights for utilization or disposal of the same; and </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 4px; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoListParagraph" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 17px; text-indent: -0.25in; font-size: 16px;"><span style="line-height: 104%; font-family: Symbol;"><span>·<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Consent the Company and/ or its
clients to use or adapt material to which you have contributed, in any manner
and without expressly acknowledging your individual contribution. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">8.</span><span style="line-height: 107%;">Confidential and Proprietary Information </span></h2>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Information and materials relating to the
Company, its clients, licensors and suppliers that are not publicly available
must be treated as confidential and proprietary (“Confidential Information”)
and may only be used or disclosed for obligation purposes related to your
employment duties with the Company. </span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">You have an obligation to safeguard
Confidential Information from unauthorized use and disclosure. Confidential
Information includes, but is not limited to, the Company's professional,
technical and administrative manuals; associated forms, processes, and computer
systems (including hardware, software, databases and Information technology
systems); other methodologies and systems; marketing and business development
plans and strategies; client and prospect files, lists and materials; research
materials; investigative materials; and project notes and plans. </span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Because Confidential Information is extremely
valuable, the Company takes measures to maintain its confidentiality and guard
its secrecy. Confidential Information may be copied, disclosed or used by you
during your employment with the Company only as necessary to carry out Company
business and, where applicable, only as required or authorized under the terms
of any agreements between the Company and its clients, licensors and suppliers.
</span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">You agree not to take or keep any Confidential
Information when you leave the Company. If you are ever asked to disclose any
information or materials that are subject to these confidentiality
restrictions, pursuant to legal process or otherwise, you must contact the
business unit head or directors to seek the Company's consent prior to any
disclosure. These confidentiality restrictions are permanent and do not lapse
or cease upon your departure from the Company.</span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">9.</span><span style="line-height: 107%;">Insider Information </span></h2>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 1px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">You are prohibited from using or sharing
information, not publicly disclosed, which you obtain during the course of your
work for the Company, for your personal gain or advantage in securities
transactions, or for the personal gain or advantage of anyone with whom you
improperly share this information. This restriction applies to such information
related to any company, not just the Company's clients and their affiliates.
The foregoing obligation is in addition to any obligation that you have not to
purchase or hold securities of entities with respect to which the Company must
maintain independence. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 0.05in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">10.</span><span style="line-height: 107%;">Protection of computer software/Company’s
Assets </span></h2>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">The Company has a strict policy prohibiting
the unauthorized reproduction or use of computer software purchased or licensed
from an outside vendor. You will not bring into the Company, or use, any
unauthorized or unlicensed software. You will be required to sign a declaration
annually that you are complying with this policy. All Company property/ assets,
including any copies thereof, must be returned to the Company on termination of
employment or whenever requested by the company. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">You will be provided with access to a computer
for your business use in the office. If you are allocated a portable computer
for use with your work, you are required to take additional responsibility for
the physical security of the equipment as well as the information stored
therein. You must make yourself aware of and comply with Company’s relevant
policies and procedures applicable to usage of the Company’s computer
equipment, including the Company’s policies on the appropriate use of email and
the internet. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">You acknowledge and agree that the Company
reserves the right to monitor your usage of the Company’s computer(s) and IT
systems/resources towards ensuring that there is no unauthorized usage thereof.
In case of any damage due to Negligence apart from any wear &amp; tear the
company is entitled to recover 80% of the cost of damage from you. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">11.</span><span style="line-height: 107%;">Exclusivity </span></h2>

<p class="MsoNormal" style="margin: 0in 0in 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span>&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">During the continuance of your
employment with the Company, it is a condition of your employment that you will
not engage yourself in any other trade, business or occupation, including
private business and consulting, without obtaining prior permission from the
director of the Company.</span></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<h2 style="margin: 0in; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; text-indent: 0in; font-size: 16px;"><span style="line-height: 107%;">12.</span><span style="line-height: 107%;">Performance Management </span></h2>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: normal; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">As a part of the People Growth Cycle, we follow an Annual
Appraisal Cycle in the month of April &amp; October of any given calendar year.
We encourage outstanding performance consistently and hence you may also be
appraised at any time during the year. However, there is no standard process of
increments after completion of probation in the company. Such appraisals are
undertaken only in the event of outstanding performance and only unanimous
management decision. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">13.</span><span style="line-height: 107%;">Notice Period </span></h2>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">The Company or you may, at any time
during the course of the employment by stating their intention to do so in
writing, terminate the employment by giving notice of 1 month or more or a
salary payment in lieu of that notice. The Company may require you to complete
all operative parts of the assignment or project that you may be involved in on
the date of resignation as determined by the Company. If, in exceptional cases,
the Company may agree to your request for an early release, the Company will
recover the salary or part thereof equivalent to the balance notice period. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">During the probation period, the company can
terminate the employment forthwith without any notice.</span></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><strong><span style="line-height: 104%;">14.</span></strong><span style="line-height: 104%;"> <strong>Summary Termination: </strong></span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 1px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">This Agreement and your employment may be
terminated by the Company immediately without prior notice if you at any time: </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(i)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Commit any breach of your obligations
under this Agreement;</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(ii)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Disobey a lawful and reasonable order
of the Company;</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(iii)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Misconduct yourself under the
influence of any substance abuse. If the company has reasonable grounds of
suspecting that you are under the influence of illegal substance abuse while at
work, the company may request you to undergo a noninvasive drug test which will
be conducted by a medical professional. If found guilty, your employment may be
terminated without any notice there.</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(iv)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Are guilty of or attempted to commit
fraud, dishonesty, theft or gross malfeasance, including, without limitation,
conduct of a disruptive, criminal nature, conduct involving moral turpitude,
embezzlement, or misappropriation of assets, misuse of the Company’s property;</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(v)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Are neglectful in your duties, despite
being warned;</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(vi)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Fail to report for work at the
Company’s office by the Effective Date;</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(vii)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Remain absent from duty for more than
3 days, without prior permission of a designated senior</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(viii)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">Misrepresent any information to the
Company or make any false declaration to the Company or it is found that you
suppressed any information from the Company. This clause shall also be
applicable to any information or declaration or act committed prior to entering
into the employment of the Company;</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 51px; text-align: left; text-indent: -51px; font-size: 16px;"><span style="line-height: 104%;"><span>(ix)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><span style="line-height: 104%;">You are deemed incapable of continuing
in service or performing given work satisfactorily, owing to any physical or mental
infirmity/ incapacity or any other reason whatsoever.</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-align: left; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">This list is not
exhaustive. The Company shall also be entitled to terminate your employment
immediately without prior notice for any other cause recognized by applicable
law.</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-align: left; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">In the event of
termination pursuant to the above provision the Company shall not be obliged to
make any further payment to you beyond the amount of any remuneration and
payment in lieu of untaken holiday actually accrued up to and including the
date of such termination.</span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-align: left; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Further, the
termination of employment under this Agreement shall be without prejudice to
any right that the Company may have in respect of any breach by you of any of
the provisions of this Agreement, which may have occurred prior to such termination.</span></p>

<p class="MsoNormal" align="left" style="margin: 0in 1px 0px 31px; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="margin: 0in 1px 0px 31px; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; font-size: 16px;"><span style="line-height: 104%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="font-family: Inter, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-family: Arial, Helvetica, sans-serif;">15.<span>&nbsp; </span>Exit formalities: </span></strong></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Before termination of employment, you will be
required to complete exit formalities and sign necessary forms in this regard,
as per the policies of the Company. You will be required to return all
documents and property (including copies thereof) belonging to the Company
before your last working day in order to obtain release. You are also
specifically restrained from keeping copies, forwarding any mails or extracts
of any of the Company’s or client’s documents, codes, information with you,
after your release from the services of the Company, except with specific
written permission from the Company. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 2px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 4px; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">As part of your exit formalities, you
have to provide in writing to us that you will be personally liable to us and/
or our clients for any data/ confidential information retained by you, in any
unauthorized manner or disclosed by you even after the tenure of your
employment. </span></p>

<p class="MsoNormal" align="left" style="margin: 0in 0in 0px; font-family: Arial, Helvetica, sans-serif; color: black; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<h2 style="margin: 0in 0in 0in 6px; text-indent: -1px; line-height: 107%; break-after: avoid; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><span style="line-height: 107%;">16.</span><span style="line-height: 107%;">Non-Solicitation </span></h2>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 1px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">Upon leaving the Company you will not,
without prior written consent of the Company, for a period of 24 (twenty-four)
months from the date of ceasing employment, canvass, solicit, interfere with or
entice away any person, Company or corporation who has, at any time during your
employment with the Company, been a client of the Company with whom you have
had contact or been involved in the provision of services, or an employee of
the Company.</span></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Inter, sans-serif; color: black; margin: 0in 1px 0px 0in; text-indent: 0in; font-size: 16px;"><span style="line-height: 104%; font-family: Arial, Helvetica, sans-serif;">To prevent any potential conflict of
interest or breach of confidentiality, you will not accept an appointment
offered by a client for whom an assignment is being performed by you or on
which you are working for twenty-four months after the last working day, unless
appropriate written consent is obtained from the Company. It is mandatory to
immediately notify your director of such an offer.</span></p>

<p class="MsoNormal" style="text-align: justify; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" style="text-align: justify; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%;">&nbsp;</span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" align="center" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="center" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: center; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 27px;">Declaration to be signed by the Employee</span></strong><span><br clear="all" style="break-before: page;">
</span></p>

<h2 align="center" style="line-height: 107%; break-after: avoid; font-family: Inter, sans-serif; color: black; margin: 0in 42px 9px 0in; text-align: center; text-indent: 0in; font-size: 16px;"><span style="line-height: 107%; font-size: 21px; font-family: Arial, Helvetica, sans-serif;">DECLARATION
</span></h2>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; font-size: 16px;"><span style="font-family: Arial, Helvetica, sans-serif;">By signing this agreement, I hereby acknowledge and agree that I
have carefully read and understood the above agreement (including the attached
terms and conditions thereto) and accept the same unconditionally. I will make
myself fully aware of, and be bound by, the rules and regulations of the
Company as amended from time to time. In particular, I declare that: </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>a)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span></strong><span>I
will furnish original copies of my certificates, testimonials and other
necessary documents, on demand. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>b)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span></strong><span>I
acknowledge and agree to the Company reserving the right to get a background
check conducted on me through a third-party agency. In furtherance thereof, I
authorize the Company to collect and retain copies of my personal particulars
(including educational certificates, copies of passport, driving license, PAN
card, and voter-identification card) either directly or through a third-party
agency. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>c)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span></strong><span>There
are no ongoing or pending criminal cases/ criminal liabilities on me</span></p>

<p><span style="font-family: Arial, Helvetica, sans-serif;"><br></span></p><table cellpadding="0" cellspacing="0">
  <tbody><tr>
   <td width="12" height="0"><span style="font-family: Arial, Helvetica, sans-serif;"><br></span></td>
  </tr>
  <tr>
   <td><span style="font-family: Arial, Helvetica, sans-serif;"><br></span></td>
   <td><img width="790" height="115" src="file:///C:/Users/91741/AppData/Local/Packages/oice_16_974fa576_32c1d314_30c6/AC/Temp/msohtmlclip1/01/clip_image004.gif" v:shapes="Picture_x0020_2977"></td>
  </tr>
 </tbody></table>
 <!--[endif]----><p><span style="font-family: Arial, Helvetica, sans-serif;"><br clear="ALL">
</span></p><p><span style="font-family: Arial, Helvetica, sans-serif;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></span></p><p><span style="font-family: Arial, Helvetica, sans-serif;"><br></span></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>d)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span></strong><span>I am
not in possession, in an unauthorized manner, of any confidential, sensitive or
personal information/ data/ material of any other Company or individual
(collectively “Sensitive Data”). I shall not bring any Sensitive Data into the
Company, and shall not use any such Sensitive Data in an unauthorized manner,
during or after my tenure with the Company </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>e)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span></strong><span>I
shall not commit, or cause to commit, any act or omission, which I believe to
be illegal or against Company’s policies and core values for time being in
force. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 4px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span style="line-height: 107%; font-size: 13px;"><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" style="text-align: justify; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 0px 31px; text-indent: -24px; font-size: 16px;"><strong><span style="line-height: 104%;"><span>f)<span style="font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span></strong><span>In
the event of any wilful or intentional misconduct, fraud, dishonesty or breach
of confidentiality on my part, I will personally be liable to the Company and/
or its clients. </span></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><span><span>&nbsp;</span></span><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 0in 5px; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span>&nbsp;</span></strong><br></p>

<p class="MsoNormal" align="left" style="font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in; text-align: left; text-indent: 0in; line-height: 107%; font-size: 16px;"><strong><span style="line-height: 107%; font-size: 23px;"><span>&nbsp;</span></span></strong><br></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 15px 31px; font-size: 16px;"><strong><span>Name<span>&nbsp;
</span><span>&nbsp;</span></span></strong><span>______________________</span></p>

<p class="MsoNormal" style="text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; margin: 0in 1px 15px 31px; font-size: 16px;"><strong><span>Signature </span></strong><span>______________________</span></p>

<p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Arial, Helvetica, sans-serif; color: black; font-size: 16px;"><strong><span>Date </span></strong><span>______________________</span></p><p class="MsoNormal" style="margin: 0in 1px 0px 31px; text-align: justify; text-indent: -1px; line-height: 104%; font-family: Inter, sans-serif; color: black; font-size: 16px;"><span><br></span></p>`;

const data2 = `<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; background: yellow; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">28<sup>TH</sup> of June 2024</span></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Arial, Helvetica, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; background: yellow; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">To Miss Surbhi Rajwanshi Sector 73 Sarafabad
        Noida, State: Uttar Pradesh Pin code: 201307</span></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Arial, Helvetica, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Subject:
        Relieving Letter</span></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Arial, Helvetica, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">This is to
        acknowledge the receipt of your resignation letter dated <span style="background: yellow;">28 June 2024</span> from the
        post of <span style="background: yellow;">"FRONT-END
            DEVLOPER</span>” While accepting the same, we thank you very much for the close
        association you had with us during the tenure <span style="background: yellow;">from AUGUST 1<sup>ST</sup>, 2023 to JUNE 28<sup>TH</sup>,
            2024</span></span></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Arial, Helvetica, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">You have
        been relieved from your service with effect from the closing working hours of <span style="background: yellow;">JUNE 28<sup>TH</sup>, 2024</span></span></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Arial, Helvetica, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">We wish you
        all the best in your future</span></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Arial, Helvetica, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px;">&nbsp;</span><br></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Endeavour's
        Sincerely. </span></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Kushel Digi
        Solutions</span></p>

<p class="MsoNormal" style="margin: 0in 0in 11px; line-height: 107%; font-family: Calibri, sans-serif; font-size: 15px;"><span style="line-height: 107%; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Noida, Uttar
        Pradesh</span></p>`

const DocumentManagement = ({ setAlert, pop, setPop }) => {
  const { user  , allEmployee , saveDocs , saveRelivingLetterapi} = useMain();

  const [currEmp, setCurrEmp] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));


  const [allEmp , setAllEmp] = useState([]);
  const [SelectEmpId , setSelectEmpId] = useState("");

  const [currentPage , setCurrentPage] = useState(0);

  const allEmplget = async()=>{
    const ans = await allEmployee();
   setAllEmp(ans?.emp);
  }

  const { role } = hrms_user;

  const editor = useRef(null);

  const [content, setContent] = useState(data);
  const [content2, setContent2] = useState(data2);


  const config = {
    placeholder: "start typing",
    fontFamily: '"Inter", sans-serif',
  };

  const saveDocumentApi = async()=>{
    if(SelectEmpId === "" || SelectEmpId === "Select"){
      toast.error("Please select the user");
      return ;
    }
    const toastid =  toast.loading("Loading...");
     const ans = await saveDocs({id:SelectEmpId , content});
     console.log("ans ",ans);
      if(ans?.status){
        toast.success("Successfuly created");
      }
      else {
        toast.error("Too large Content");
      }
     toast.dismiss(toastid);
  }

  const saveRelivingLetter = async()=>{
    if(SelectEmpId === "" || SelectEmpId === "Select"){
      toast.error("Please select the user");
      return ;
    }
    const toastid =  toast.loading("Loading...");
     const ans = await saveRelivingLetterapi({id:SelectEmpId , content:content2});
      if(ans?.status){
        toast.success("Successfuly created");
      }
     toast.dismiss(toastid);
  }

  useEffect(()=>{
    allEmplget();
  },[])


  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="flex-col">
              <div className="docuwrap">

                <h2 className="docHead">Document Management</h2>

                {/* first sec */}
                <div className="leadInFir2">
                  {item.map((e, index) => (
                    <div
                      onClick={() => setCurrEmp(index)}
                      className="sinInfir"
                      key={index}
                    >
                      <img src={bxUser} alt="" />

                      <p className={`${currEmp == index ? "currEmp" : "nom"}`}>
                        {e.title}
                      </p>
                    </div>
                  ))}
                </div>
                
                  {/* second sec */}
                <div className="leadInFir2">
                  {item2.map((e, index) => (
                    <div
                      onClick={() => setCurrentPage(index)}
                      className="sinInfir"
                      key={index}
                    >
                      <img src={bxUser} alt="" />

                      <p className={`${currentPage == index ? "currEmp" : "nom"}`}>
                        {e.title}
                      </p>
                    </div>
                  ))}
                </div>


                {
                   currentPage === 0 && 
                   <>
                      <div className="docuSec">
                  
                  <div className="doSubFir">
                    <img src={docSub} alt="" />
                    <span>Offer Latter</span>
                  </div>

                  <hr />

                  <div className="doSubSs">
                    <span>Placeholders</span>
                  </div>

                  <hr />

               
                   <div className="selectEmpl">
                    <label htmlFor="">Select Employee</label>
                     <select name="SelectEmpId" value={SelectEmpId} onChange={(e)=>setSelectEmpId(e.target.value)} id="">
                      <option value="Select">Select</option>
                      {
                        allEmp?.map((emp , index)=>(

                          <option key={index} value={emp?._id}>{emp.fullName}</option>
                        ))
                      }
                     </select>
                   </div>
                  
                </div>


                {/* content */}

                 <div className="showoffercont">
                   <h2>OFFER CONFIRMATION LETTER</h2>

                 <div>
                 <div dangerouslySetInnerHTML={{ __html: content }} />
                 </div>

                 </div>

                {/* third  */}

                <div className="docuThird">
                  <h3>Format</h3>

                  <hr />

                  <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => {
                      setContent(newContent);
                    }}
                  />
                </div>

                 <button onClick={()=>saveDocumentApi()} className="doSaveBtn"><span>Save</span></button>
                   
                   </>
                }

                {
                  currentPage === 1 && 
                  <>
                  <div className="docuSec">
              
              <div className="doSubFir">
                <img src={docSub} alt="" />
                <span>Relieving Letter</span>
              </div>

              <hr />

              <div className="doSubSs">
                <span>Placeholders</span>
              </div>

              <hr />

           
               <div className="selectEmpl">
                <label htmlFor="">Select Employee</label>
                 <select name="SelectEmpId" value={SelectEmpId} onChange={(e)=>setSelectEmpId(e.target.value)} id="">
                  <option value="Select">Select</option>
                  {
                    allEmp?.map((emp , index)=>(

                      <option key={index} value={emp?._id}>{emp.fullName}</option>
                    ))
                  }
                 </select>
               </div>
              
            </div>


            {/* content */}

             <div className="showoffercont">
               <h2>RELIEVING LETTER</h2>

             <div>
             <div dangerouslySetInnerHTML={{ __html: content2 }} />
             </div>

             </div>

            {/* third  */}

            <div className="docuThird">
              <h3>Format</h3>

              <hr />

              <JoditEditor
                ref={editor}
                value={content2}
                tabIndex={1}
                config={config}
                onBlur={(newContent) => setContent2(newContent)}
                onChange={(newContent) => {
                  setContent2(newContent);
                }}
              />
            </div>

             <button onClick={()=>saveRelivingLetter()} className="doSaveBtn"><span>Save</span></button>
               
               </>

                }


             

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DocumentManagement;
