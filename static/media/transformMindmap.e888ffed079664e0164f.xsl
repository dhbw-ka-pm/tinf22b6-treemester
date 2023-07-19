<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/2000/svg">
    <xsl:output method="xml" doctype-system="mindmapData.dtd"></xsl:output>
    
    <xsl:template match="root">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" id="svgFrame" overflow="visible">
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
        <text x="{@x}" text-anchor="middle">
            <xsl:if test="name(parent::*) = 'root'">
                <xsl:attribute name="y">
                    <xsl:value-of select="@y -150"/>
                </xsl:attribute>
                <xsl:attribute name="font-weight">600</xsl:attribute>
                <xsl:attribute name="font-size">18px</xsl:attribute>
            </xsl:if>
            <xsl:if test="name(parent::*) != 'root'">
                <xsl:attribute name="y">
                    <xsl:value-of select="@y"/>
                </xsl:attribute>
                <xsl:attribute name="font-weight">200</xsl:attribute>
                <xsl:attribute name="font-size">12px</xsl:attribute>
            </xsl:if>
            <xsl:if test="(name(parent::*) = 'root') or (name(parent::*/parent::*) = 'root')">
                <xsl:attribute name="display">inline</xsl:attribute>
                <xsl:attribute name="fill-opacity">1</xsl:attribute>
            </xsl:if>
            <xsl:if test="not((name(parent::*) = 'root') or (name(parent::*/parent::*) = 'root'))">
                <xsl:attribute name="display">none</xsl:attribute>
                <xsl:attribute name="fill-opacity">0</xsl:attribute>
            </xsl:if>
            <xsl:value-of select="@text" />
        </text>
        <xsl:apply-templates select="node" mode="text"/>
    </xsl:template>
</xsl:stylesheet>