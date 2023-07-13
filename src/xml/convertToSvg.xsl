<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/2000/svg">
    <xsl:output method="xml" doctype-system="testData.dtd"></xsl:output>
    
    <xsl:template match="root">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" id="svgFrame">
            <g class="svgRoot">
                <xsl:apply-templates select="node" mode="circle"/>
                <xsl:apply-templates select="node" mode="text"/>
            </g>
        </svg>
    </xsl:template>
    
    <xsl:template match="node" mode="circle">
        <circle r="{@radius}" cx="{@x}" cy="{@y}" style="fill: {@color}"></circle>
        <xsl:apply-templates select="node" mode="circle"/>
    </xsl:template>
    
    <xsl:template match="node" mode="text">
        <text x="{@x}" y="{@y}">
            <xsl:value-of select="@text" />
        </text>
        <xsl:apply-templates select="node" mode="text"/>
    </xsl:template>
</xsl:stylesheet>