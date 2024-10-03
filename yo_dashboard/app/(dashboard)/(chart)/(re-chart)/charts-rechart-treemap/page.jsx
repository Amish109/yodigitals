import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicTreeMap from "./basic-tree-map";
import CustomContentTreeMap from "./custom-content-treemap";

const ChartjsRechartTreemapPage = () => {
    return (
        <div className="grid xl:grid-cols-2  grid-cols-1 gap-6 ">
            <Card>
                <CardHeader>
                    <CardTitle>Simple Tree Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <BasicTreeMap />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Custom Content Tree Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <CustomContentTreeMap />
                </CardContent>
            </Card>
        </div>
    );
};

export default ChartjsRechartTreemapPage;
